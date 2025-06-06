/**
 * Command Pattern
 *
 * Purpose:
 * Encapsulates a request as an object, thereby allowing for parameterization of clients with different requests,
 * queuing of requests, and logging or support for undoable operations.
 *
 * Key Components:
 * - Command Interface: Declares execution and undo methods.
 * - Concrete Commands: Implement specific actions and how to undo them.
 * - Command Invoker (CommandStack): Executes commands and stores history for undo.
 */

// -------------------------
// COMMAND INTERFACE
// -------------------------

interface Command {
    execute(): number;
    undo(): number;
}

// -------------------------
// COMMAND STACK (INVOKER)
// -------------------------

class Calculator {
    private Commands: Command[] = [];

    constructor(private state: number) { }

    getState(): number {
        return this.state;
    }

    executeCommand(command: Command): void {
        this.state = command.execute();
        this.Commands.push(command);
    }

    undoCommand(): void {
        const lastCommand = this.Commands.pop();
        if (lastCommand) {
            this.state = lastCommand.undo();
        }
    }
}

// -------------------------
// CONCRETE COMMANDS
// -------------------------

class Add implements Command {
    constructor(private value: number = 1, private calculator: Calculator) { }
    execute(): number {
        return this.calculator.getState() + this.value;
    }
    undo(): number {
        return this.calculator.getState() - this.value;
    }
}

class Subtract implements Command {
    constructor(private value: number = 1, private calculator: Calculator) { }
    execute(): number {
        return this.calculator.getState() - this.value;
    }
    undo(): number {
        return this.calculator.getState() + this.value;
    }
}

class Multiply implements Command {
    constructor(private factor: number, private calculator: Calculator) { }
    execute(): number {
        return this.calculator.getState() * this.factor;
    }
    undo(): number {
        return this.calculator.getState() / this.factor;
    }
}

class Divide implements Command {
    constructor(private divisor: number, private calculator: Calculator) {
        if (divisor === 0) throw new Error("Division by zero is not allowed.");
    }
    execute(): number {
        return this.calculator.getState() / this.divisor;
    }
    undo(): number {
        return this.calculator.getState() * this.divisor;
    }
}

// -------------------------
// CLIENT CODE (DEMO)
// -------------------------

export default () => {
    const calculator = new Calculator(10);

    console.log("Initial:", calculator.getState());

    calculator.executeCommand(new Add(5, calculator));
    console.log("After Add(5):", calculator.getState());

    calculator.executeCommand(new Subtract(4, calculator));
    console.log("After Subtract(4):", calculator.getState());

    calculator.executeCommand(new Multiply(3, calculator));
    console.log("After Multiply(3):", calculator.getState());

    calculator.executeCommand(new Divide(2, calculator));
    console.log("After Divide(2):", calculator.getState());

    calculator.undoCommand();
    console.log("After Undo:", calculator.getState());

    calculator.undoCommand();
    console.log("After Undo:", calculator.getState());
};
