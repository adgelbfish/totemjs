import Timeline from "../util/Timeline";
import sjcl from "../../external-lib/sjcl";
import jsan from "jsan";
import cloneDeep from "lodash/cloneDeep";

function Golem(
  perspective,
  fns,
  topics,
  description = "",
  spies = []
) {
  const perspectiveClone = cloneDeep(perspective);
  const hashString = sjcl.hash.sha256(jsan.stringify([fns, topics]));
  const tl = new Timeline(perspectiveClone, hashString, spies);

  fns.forEach(
    tl.subscribeToEvent(fn.hash, fn.fn, fn.description ? fn.description : "")
  );

  topics.forEach(topic => topic.subscribe(tl.pushEvent));

  spies.forEach(spy => spy({
    type: "new topic",
    payload: {
      hash: hashString,
      desc: description,
      subscriptions: {
        topics: topics.map(topic => topic.hash),
        fns: fns.map(fn => fn.hash)
      },
      emittedEvents: tl.getFnInfo()
    }
  }));

  return {
    subscribe: tl.subscribe,
    hash: hashString,
    broadcast: tl.pushEvent
  };
}

export {Golem}
