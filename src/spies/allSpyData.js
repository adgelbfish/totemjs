import Topic from "../topic/Topic";
import SimpleWhenCreator from "../util/SimpleWhenCreator";
import sjcl from "../../external-lib/sjcl";
import jsan from "jsan";

export const genericSpy = data => allSpyData.broadcast(genericSpyHash, data);

const genericSpyDescription = "generic spy, catches all data";

const genericSpyHash = sjcl.hash.sha256(
  jsan.stringify(genericSpy) + genericSpyDescription
);

const needsSeparationBuilderAndPrinter = (perspective, data) => {
  perspective.push(data);
  console.log(perspective);
  return perspective;
};

const builderAndPrinterDescription = "helps build the perspective and prints the perspective"

const fns = [
  new SimpleWhenCreator(builder, genericSpyHash, builderAndPrinterDescription)
];

export const allSpyData = new Topic([], fns, [], "all spy data");

