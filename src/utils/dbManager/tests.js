import DbManager from "./";
import Class from "./Class";
import Attribute from "./Attribute";

const testDataModel = async () => {
    let testDbMg = new DbManager("testDb");
    var TestClass = new Class(testDbMg, "TestClass", "class");
    // Create attribute and adds it to above class
    var TestAttribute = new Attribute("TestAttribute", "string", { charLength: 100 });
    
    testDbMg = await DbManager.build(testDbMg);
    TestClass = await Class.build(TestClass);
    debugger;
    // add attribute to TestClass
    await TestClass.addAttribute(TestAttribute);
    // Should cause error since attribute with the same name was already added 
    // let TestAttributeWithClass;
    // try {
    //   TestAttributeWithClass = new Attribute("TestAttribute", "string", { charLength: 100 }, TestClass);
    // } catch (e) {
    //   console.log("Error", e);
    // }
    // Should auto add attribute to above class
    let TestAnotherAttrWithClass = new Attribute("TestAnotherAttrWithClass", "string", { charLength: 100, isArray: true }, TestClass);
    TestAnotherAttrWithClass = await Attribute.build(TestAnotherAttrWithClass);
}

const testFind = async () => {
    let testDbMg = new DbManager("testDb");
    testDbMg = await DbManager.build(testDbMg);
    let filteredClasses = await testDbMg.getClasses(["TestClass"]);
    debugger;

}

const test = () => {
    // testDataModel();
    testFind();
}

export default test;

