import cloneDeep from "lodash/cloneDeep";
import sjcl from "../../external-lib/sjcl";
import jsan from "jsan";

export default function Timeline(perspective, thisHash, spies = []) {
  const events = [];
  const subscriptionsToEvents = {};
  const subscriptions = [];
  const fnInfo = [];

  const save = (hash, payload) =>
    events.push({ hash, payload: cloneDeep(payload), time: new Date() });

  const subscribeToEvent = (hash, when, description = "") => {
    let returnHash = sjcl.hash.sha256(thisHash + jsan.stringify(when));
    (subscriptionsToEvents[hash] = subscriptionsToEvents[hash] || []).push({
      when: when,
      returnHash: returnHash,
      hash: hash
    });
    let info = {
      hash: hash,
      returnHash: returnHash,
      desc: description
    };
    fnInfo.push(info);
    spies.forEach(spy => spy({
      type: "fn subscription added",
      payload: info
    }));
  };

  const pushEvent = (hash, payload) => {
    save(hash, payload);
    (subscriptionsToEvents[hash] || []).forEach(when =>
      when.when(perspective, when.returnHash, cloneDeep(payload), pushEvent));
    subscriptions.forEach(when => when(hash, payload));
    spies.forEach(spy => spy({
      type: "event",
      payload: {
        hash: hash,
        payload: payload,
        eventsHistory: events
      }
    }));
  };

  const getHistory = () => cloneDeep(events);

  const subscribe = when => subscriptions.push([hash, when]);

  const getFnInfo = () => cloneDeep(fnInfo)

  return {
    subscribeToEvent,
    pushEvent,
    getHistory,
    subscribe,
    getFnInfo
  };
}
