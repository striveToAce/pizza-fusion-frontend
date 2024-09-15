
# Pizza Fusion Frontend

The **Pizza Fusion Frontend** is the user-facing interface of the Pizza Fusion application. It allows users to select between customer and admin views, place orders, manage menu items, and interact with real-time updates.

This frontend is built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Axios** for API calls. Real-time updates are powered by **Supabase**.

---

## Table of Contents
1. [Features](#features)
2. [View Modes](#view-modes)
3. [API Integration](#api-integration)
4. [Real-Time Updates](#real-time-updates)
5. [Setup Instructions](#setup-instructions)
6. [Environment Variables](#environment-variables)
7. [Kubernetes Deployment](#kubernetes-deployment)
8. [Contributing](#contributing)

---

## Features

- **Select View Mode**: Choose between Customer view and Admin view.
- **Customer View**:
  - Select pizza and soda from the menu.
  - Fetch menu data from the Menu microservice.
  - Estimate order time based on the number of pizzas using the Chef microservice.
  - Add items to cart, edit cart, and place orders.
- **Admin View**:
  - Manage menu items (add/update/delete).
  - Real-time dashboard to monitor live order updates.
- **Real-Time Updates**: Uses Supabase to subscribe to changes in the `order` table, updating the admin dashboard in real time.

---

## View Modes

### Customer View
1. **Menu Selection**: Customers can browse and select pizzas and sodas from the menu, with data coming from the **Menu microservice**.
2. **Order Estimation**: Based on the number of pizzas in the cart, an API call is made to the **Chef microservice** to fetch the estimated preparation time for the order.
3. **Cart Management**: Customers can add, edit, and remove items from their cart.
4. **Place Order**: After reviewing the cart, the customer can place an order by sending the details to the **Order microservice**.

### Admin View
1. **Manage Menu Items**: Admins can add, update, or delete pizza or soda items from the menu. API calls are made to the **Menu microservice**.
2. **Real-Time Order Updates**: The admin dashboard is updated in real-time using **Supabase**, which subscribes to changes in the `order` table from the **Order microservice**.

---

## API Integration

The frontend interacts with three microservices:

- **Menu Microservice**:
  - Fetch menu items for pizzas and sodas.
  - Manage menu items as an admin.
  
- **Chef Microservice**:
  - Estimate the total preparation time based on the number of pizzas.

- **Order Microservice**:
  - Place customer orders.
  - Fetch, update, and manage orders.

APIs are handled using **Axios**, and the URLs are stored in environment variables.

---

## Real-Time Updates

Real-time updates are powered by **Supabase**. The admin dashboard subscribes to changes in the `order` table and reflects new or updated orders in real-time.

```js
useEffect(() => {
  const subscription = supabase
    .channel('table-db-changes')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'order',
    }, (payload) => {
      console.log('New event: ', payload);
      // Update admin dashboard with the payload data
    })
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

---

## Setup Instructions

### Prerequisites
- **Node.js** v20.16.0 or higher
- **npm** or **yarn**
- **Docker** (for containerization)
- **Kubernetes** (for orchestration)

### Local Development Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/pizza-fusion-frontend.git
   cd pizza-fusion-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
**DOCKER IMAGE (HAVE ALREADY ENV APPLIED)**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_MENU_SERVICE_URL=your_menu_service_url
   NEXT_PUBLIC_CHEF_SERVICE_URL=your_chef_service_url
   NEXT_PUBLIC_ORDER_SERVICE_URL=your_order_service_url
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   **DOCKER IMAGE (HAVE ALREADY ENV APPLIED)**

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Access the service**:
   Open `http://localhost:3000` in your browser.

---

## Environment Variables

The frontend requires the following environment variables to function:

- **NEXT_PUBLIC_MENU_SERVICE_URL**: The base URL for the **Menu** microservice.
- **NEXT_PUBLIC_CHEF_SERVICE_URL**: The base URL for the **Chef** microservice.
- **NEXT_PUBLIC_ORDER_SERVICE_URL**: The base URL for the **Order** microservice.
- **NEXT_PUBLIC_SUPABASE_URL**: The URL for the **Supabase** instance.
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: The anonymous key for connecting to **Supabase**.

---

## Kubernetes Deployment

### 1. **Deploy to Kubernetes**

First, ensure that the **Docker image** for the frontend is built and pushed to **Docker Hub**:

```bash
docker build -t docker.io/docker380431/pizza-fusion-frontend .
docker push docker.io/your-username/pizza-fusion-frontend
```

Apply the **Kubernetes** deployment and service files:

```bash
kubectl apply -f k8s/deployment.yml
kubectl apply -f k8s/service.yml
```

### 2. **Deployment File**

#### `k8s/deployment.yml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pizza-fusion-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: pizza-fusion-frontend
  template:
    metadata:
      labels:
        app: pizza-fusion-frontend
    spec:
      containers:
      - name: pizza-fusion-frontend
        image: docker.io/docker380431/pizza-fusion-frontend:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: pizza-fusion-frontend-config
```

### 3. **Service File**

#### `k8s/service.yml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: pizza-fusion-frontend-service
spec:
  selector:
    app: pizza-fusion-frontend
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
  type: ClusterIP
```

---

## Contributing

Contributions are welcome! If you'd like to make improvements to this service, feel free to submit a PR or open an issue.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m "Add some feature"`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.
