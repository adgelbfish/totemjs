import cloneDeep from "lodash/cloneDeep";
import sjcl from "../../external-lib/sjcl";
import jsan from "jsan";

export const Timeline = function (perspective, thisHash) {
  const events = [];
  const subscriptionsToEvents = {};
  const subscriptions = [];

  const save = (hash, payload) => events.push({ hash, payload: cloneDeep(payload), time: new Date() });

  const subscribeToEvent = (hash, when) => {
    let returnHash = sjcl.hash.sha256(thisHash + jsan.stringify(when));
    (subscriptionsToEvents[hash] = subscriptionsToEvents[hash] || []).push({
      when,
      returnHash
    });
  };

  const pushEvent = (hash, payload) => {
    save(hash, payload);
    (subscriptionsToEvents[hash] || []).forEach(when => when.when(perspective, when.returnHash, cloneDeep(payload), pushEvent));
    subscriptions.forEach(when => when(hash, payload));
  };

  const getHistory = () => cloneDeep(events);

  const subscribe = when => subscriptions.push([hash, when]);

  return {
    subscribeToEvent,
    pushEvent,
    getHistory,
    subscribe
  };
};