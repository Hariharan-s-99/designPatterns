type Address = {
    street: string;
    doorNo: number
    city: string
}

type User = {
    name: string;
    age: number
    address: Address
}
class buildUser {
    private user: Partial<User>
    constructor() {
        this.user = {};
    }
    setName(name: string) {
        this.user.name = name
        return this;
    }
    setAge(age: number) {
        this.user.age = age
        return this;


    }
    setAddress(address: Address) {
        this.user.address = address
        return this;
    }
    build() {
        return this.user;
    }
}
class addressBuilder {
    private address: Partial<Address>
    constructor() {
        this.address = {};
    }
    build(city: string, doorNo: number, street: string) {
        this.address.city = city;
        this.address.doorNo = doorNo;
        this.address.street = street;
        return this.address as Address
    }
}

export default () => {
    const address = new addressBuilder();
    const user = new buildUser();
    const resultantUser = user.setName("user1").setAddress(address.build("chennai", 10, "dev 1st street")).setAge(25).build();
    console.log(resultantUser);
};