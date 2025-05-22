interface IExpression {
  interpret(): number;
}

class NumberExpression implements IExpression {
  constructor(private value: number) {}
  interpret(): number {
    return this.value;
  }
}

class AddExpression implements IExpression {
    constructor(private left: IExpression, private right: IExpression) {}
    interpret(): number {
        return this.left.interpret() + this.right.interpret();
    }
}

class SubtractExpression implements IExpression {
    constructor(private left: IExpression, private right: IExpression) {}
    interpret(): number {
        return this.left.interpret() - this.right.interpret();
    }
}

class MultiplyExpression implements IExpression {
    constructor(private left: IExpression, private right: IExpression) {}
    interpret(): number {
        return this.left.interpret() * this.right.interpret();
    }
}

export default () => {
    const addExpression = new AddExpression(new NumberExpression(2), new NumberExpression(4));
    const subtractExpression = new SubtractExpression(new NumberExpression(10), new NumberExpression(4));
    const multiplyExpression = new MultiplyExpression(new NumberExpression(2), new NumberExpression(4));
    const addValue = addExpression.interpret();
    const subtractValue = subtractExpression.interpret();
    const multiplyValue = multiplyExpression.interpret();
    console.log(addValue);
    console.log(subtractValue);
    console.log(multiplyValue);
}