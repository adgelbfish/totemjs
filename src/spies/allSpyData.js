import {Golem} from "../golem/Golem";
import SimpleWhenCreator from "../util/SimpleWhenCreator";
import sjcl from "../../external-lib/sjcl";
import jsan from "jsan";

export const genericSpy = data => allSpyData.broadcast(genericSpyHash, data);

const genericSpyDescription = "generic spy, catches all data";

const genericSpyHash = sjcl.hash.sha256(
  jsan.stringify(genericSpy) + genericSpyDescription
);

const needsSeparationBuilderAndPrinter = (perspective, data) => {
  const newPerspective = perspective.concat(data);
  console.log(perspective);
  return newPerspective;
};

const builderAndPrinterDescription = "helps build the perspective and prints the perspective"

const fns = [
  new SimpleWhenCreator(builder, genericSpyHash, builderAndPrinterDescription)
];

export const allSpyData = new Golem([], fns, [], "all spy data");

