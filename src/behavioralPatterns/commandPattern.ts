interface Command {
    execute(state: number): number;
    undo(state: number): number;
}


class CommandStack {
    private Commands: Array<Command> = [];
    constructor(private state: number) { }

    getState() {
        return this.state
    }

    executeCommand(command: Command) {
        this.state = command.execute(this.state);
        this.Commands.push(command)
    }
    undoCommand(command: Command) {
        const lastCommand = this.Commands.pop();
        if (lastCommand) this.state = lastCommand.undo(this.state)
    }
}

class Add implements Command {
    execute(state: number): number {
        return state + 1;
    }
    undo(state: number): number {
        return state - 1;

    }
}

export default () => {
    const commandStack = new CommandStack(0);
    const add = new Add();
    console.log(commandStack.getState());
    commandStack.executeCommand(add)
    console.log(commandStack.getState());
    commandStack.undoCommand(add)
    console.log(commandStack.getState());
}