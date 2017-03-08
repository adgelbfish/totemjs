import Timeline from "../util/Timeline";
import sjcl from "../../external-lib/sjcl";
import jsan from "jsan";
export const Topic = function(perspective, fns, topics) {
  const perspectiveClone = _.cloneDeep(perspective);
  const hashString = sjcl.hash.sha256(jsan.stringify([fns, topics]));
  const tl = new Timeline(perspectiveClone, hashString);

  fns.forEach(tl.subscribeToEvent(fn.hash, fn.fn));

  topics.forEach(topic => topic.subscribe(tl.pushEvent))

  return {
    subscribe: tl.subscribe,
    hash: hashString
  };
};
