/**
 * State Pattern
 *
 * Purpose:
 * Allows an object to change its behavior when its internal state changes.
 * The object will appear to change its class.
 *
 * Key Components:
 * - Context (Order): Maintains an instance of a concrete state and delegates behavior to it.
 * - State Interface (IState): Defines a common interface for all concrete states.
 * - Concrete States: Implement behavior specific to each state and handle transitions.
 */

// -------------------------
// STATE INTERFACE
// -------------------------

/**
 * IState: Common interface that all order states implement.
 * Enforces methods that each state must provide.
 */
interface IState {
    order: Order;
    verifyPayment(): void;
    cancelOrder(): void;
    shipOrder(): void;
  }
  
  // -------------------------
  // CONTEXT CLASS (ORDER)
  // -------------------------
  
  /**
   * Order: The context class that changes its behavior based on its internal state.
   * It holds references to all possible states and delegates method calls to the current state.
   */
  class Order {
    public paymentPendingState: IState;
    public cancelledOrderState: IState;
    public orderShippedState: IState;
    public orderPreparedState: IState;
    public currentState: IState;
  
    constructor() {
      // Initialize states with reference to context
      this.paymentPendingState = new PaymentPendingState(this);
      this.cancelledOrderState = new CancelledOrderState(this);
      this.orderShippedState = new OrderShippedState(this);
      this.orderPreparedState = new OrderPreparedState(this);
  
      // Set the initial state to PaymentPending
      this.currentState = this.paymentPendingState;
    }
  
    /**
     * getState: Returns the current state.
     */
    getState() {
      return this.currentState;
    }
  
    /**
     * setState: Updates the current state and logs the transition.
     */
    setState(state: IState) {
      this.currentState = state;
      console.log(`🔄 STATE CHANGED: ${state.constructor.name}`);
    }
  
    /**
     * Delegates behavior to the current state's implementation.
     */
    verifyPayment() {
      this.currentState.verifyPayment();
    }
  
    cancelOrder() {
      this.currentState.cancelOrder();
    }
  
    shipOrder() {
      this.currentState.shipOrder();
    }
  }
  
  // -------------------------
  // CONCRETE STATES
  // -------------------------
  
  /**
   * PaymentPendingState: Initial state of the order.
   * Allows verification of payment or cancellation.
   */
  class PaymentPendingState implements IState {
    order: Order;
  
    constructor(order: Order) {
      this.order = order;
    }
  
    verifyPayment(): void {
      console.log("✅ SUCCESS: Payment verified! Order will be prepared.");
      this.order.setState(this.order.orderPreparedState);
    }
  
    cancelOrder(): void {
      console.log("❌ ERROR: Order cancelled by user.");
      this.order.setState(this.order.cancelledOrderState);
    }
  
    shipOrder(): void {
      console.log("🚫 ACTION DENIED: Cannot ship the order. Please verify payment first.");
    }
  }
  
  /**
   * CancelledOrderState: Terminal state when an order is cancelled.
   * No further operations like shipping or payment verification are allowed.
   */
  class CancelledOrderState implements IState {
    order: Order;
  
    constructor(order: Order) {
      this.order = order;
    }
  
    verifyPayment(): void {
      console.log("🚫 ACTION DENIED: Cannot verify payment. Order is cancelled.");
    }
  
    cancelOrder(): void {
      console.log("ℹ️  INFO: Order has already been cancelled.");
    }
  
    shipOrder(): void {
      console.log("🚫 ACTION DENIED: Cannot ship. Order is cancelled.");
    }
  }
  
  /**
   * OrderPreparedState: Represents a state where order is ready to be shipped.
   * Allows cancellation or proceeding to shipping.
   */
  class OrderPreparedState implements IState {
    order: Order;
  
    constructor(order: Order) {
      this.order = order;
    }
  
    verifyPayment(): void {
      console.log("ℹ️  INFO: Payment was already verified.");
    }
  
    cancelOrder(): void {
      console.log("❌ ERROR: Order cancelled. Changes will be applied.");
      this.order.setState(this.order.cancelledOrderState);
    }
  
    shipOrder(): void {
      console.log("📦 SUCCESS: Order shipped to customer.");
      this.order.setState(this.order.orderShippedState);
    }
  }
  
  /**
   * OrderShippedState: Terminal state when an order has been shipped.
   * No modifications are allowed.
   */
  class OrderShippedState implements IState {
    order: Order;
  
    constructor(order: Order) {
      this.order = order;
    }
  
    verifyPayment(): void {
      console.log("ℹ️  INFO: Payment already verified. Order is shipped.");
    }
  
    cancelOrder(): void {
      console.log("🚫 ACTION DENIED: Cannot cancel. Order is already shipped.");
    }
  
    shipOrder(): void {
      console.log("ℹ️  INFO: Order has already been shipped.");
    }
  }
  
  // -------------------------
  // CLIENT CODE (ORDER FLOW DEMO)
  // -------------------------
  
  /**
   * Entry point simulating an order's lifecycle through various states.
   * Demonstrates state transitions and how behavior varies by current state.
   */
  export default () => {
    const order = new Order();
    
    order.getState().shipOrder();       // Should be denied — payment not verified
    order.getState().cancelOrder();     // Moves to CancelledOrderState
    order.getState().verifyPayment();   // Moves to OrderPreparedState
    order.getState().shipOrder();       // Should be denied — order cancelled
  };
  