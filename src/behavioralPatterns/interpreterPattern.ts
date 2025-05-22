/**
 * Interpreter Pattern
 *
 * Purpose:
 * Provides a way to evaluate language grammar or expressions. The pattern defines a
 * grammatical representation for a language and an interpreter to interpret the grammar.
 *
 * Key Components:
 * - Expression Interface: Declares the `interpret` method used to evaluate an expression.
 * - TerminalExpression: Implements basic expression evaluation (e.g., numbers).
 * - NonTerminalExpression: Implements complex expressions composed of other expressions (e.g., add, subtract).
 * - Client: Composes and interprets the expression tree.
 */

// -------------------------
// EXPRESSION INTERFACE
// -------------------------

/**
 * IExpression: Interface for all expression types.
 * Requires an `interpret` method that returns a number.
 */
interface IExpression {
    interpret(): number;
  }
  
  // -------------------------
  // TERMINAL EXPRESSION
  // -------------------------
  
  /**
   * NumberExpression: Represents a numeric value in the expression tree.
   * Implements the IExpression interface and returns the number directly.
   */
  class NumberExpression implements IExpression {
    constructor(private value: number) {}
  
    interpret(): number {
      return this.value;
    }
  }
  
  // -------------------------
  // NON-TERMINAL EXPRESSIONS
  // -------------------------
  
  /**
   * AddExpression: Represents addition of two expressions.
   * Interprets by evaluating both sides and returning their sum.
   */
  class AddExpression implements IExpression {
    constructor(private left: IExpression, private right: IExpression) {}
  
    interpret(): number {
      return this.left.interpret() + this.right.interpret();
    }
  }
  
  /**
   * SubtractExpression: Represents subtraction of two expressions.
   * Interprets by evaluating both sides and returning the difference.
   */
  class SubtractExpression implements IExpression {
    constructor(private left: IExpression, private right: IExpression) {}
  
    interpret(): number {
      return this.left.interpret() - this.right.interpret();
    }
  }
  
  /**
   * MultiplyExpression: Represents multiplication of two expressions.
   * Interprets by evaluating both sides and returning the product.
   */
  class MultiplyExpression implements IExpression {
    constructor(private left: IExpression, private right: IExpression) {}
  
    interpret(): number {
      return this.left.interpret() * this.right.interpret();
    }
  }
  
  // -------------------------
  // CLIENT CODE (DEMO)
  // -------------------------
  
  /**
   * Entry point demonstrating the Interpreter pattern.
   * Constructs and evaluates different arithmetic expressions using the expression tree.
   */
  export default () => {
    const addExpression = new AddExpression(
      new NumberExpression(2),
      new NumberExpression(4)
    );
  
    const subtractExpression = new SubtractExpression(
      new NumberExpression(10),
      new NumberExpression(4)
    );
  
    const multiplyExpression = new MultiplyExpression(
      new NumberExpression(2),
      new NumberExpression(4)
    );
  
    console.log(`➕ 2 + 4 = ${addExpression.interpret()}`);
    console.log(`➖ 10 - 4 = ${subtractExpression.interpret()}`);
    console.log(`✖️ 2 * 4 = ${multiplyExpression.interpret()}`);
  };
  