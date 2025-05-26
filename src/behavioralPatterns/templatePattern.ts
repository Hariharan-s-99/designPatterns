abstract class BreverageMaker {
  public makeBreverage() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }

  private boilWater() {
    console.log("boiling water");
  }
  protected pourInCup() {
    console.log("Pouring in cup");
  }
  protected abstract brew(): void;

  protected addCondiments(): void {}
}

class CoffeeMaker extends BreverageMaker {
  protected brew(): void {
    console.log("brewing coffee");
  }
  protected addCondiments(): void {
    console.log("adding choco chips");
  }
}

export default () => {
  const coffeeMaker = new CoffeeMaker();
  coffeeMaker.makeBreverage();
};
