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
    execute(state: number): number;
    undo(state: number): number;
}

// -------------------------
// COMMAND STACK (INVOKER)
// -------------------------

class CommandStack {
    private Commands: Command[] = [];

    constructor(private state: number) {}

    getState(): number {
        return this.state;
    }

    executeCommand(command: Command): void {
        this.state = command.execute(this.state);
        this.Commands.push(command);
    }

    undoCommand(): void {
        const lastCommand = this.Commands.pop();
        if (lastCommand) {
            this.state = lastCommand.undo(this.state);
        }
    }
}

// -------------------------
// CONCRETE COMMANDS
// -------------------------

class Add implements Command {
    constructor(private value: number = 1) {}
    execute(state: number): number {
        return state + this.value;
    }
    undo(state: number): number {
        return state - this.value;
    }
}

class Subtract implements Command {
    constructor(private value: number = 1) {}
    execute(state: number): number {
        return state - this.value;
    }
    undo(state: number): number {
        return state + this.value;
    }
}

class Multiply implements Command {
    constructor(private factor: number) {}
    execute(state: number): number {
        return state * this.factor;
    }
    undo(state: number): number {
        return state / this.factor;
    }
}

class Divide implements Command {
    constructor(private divisor: number) {
        if (divisor === 0) throw new Error("Division by zero is not allowed.");
    }
    execute(state: number): number {
        return state / this.divisor;
    }
    undo(state: number): number {
        return state * this.divisor;
    }
}

// -------------------------
// CLIENT CODE (DEMO)
// -------------------------

export default () => {
    const commandStack = new CommandStack(10);

    console.log("Initial:", commandStack.getState());

    commandStack.executeCommand(new Add(5));
    console.log("After Add(5):", commandStack.getState());

    commandStack.executeCommand(new Subtract(2));
    console.log("After Subtract(2):", commandStack.getState());

    commandStack.executeCommand(new Multiply(3));
    console.log("After Multiply(3):", commandStack.getState());

    commandStack.executeCommand(new Divide(2));
    console.log("After Divide(2):", commandStack.getState());

    commandStack.undoCommand();
    console.log("After Undo:", commandStack.getState());

    commandStack.undoCommand();
    console.log("After Undo:", commandStack.getState());
};
