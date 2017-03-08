export const WhenCreator = function (syncDataManipulator) {
  return function (perspective, returnHash, payload, pushEvent) {
    pushEvent(returnHash, syncDataManipulator(perspective, payload))
  }
};