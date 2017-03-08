export default function SimpleWhenCreator(
  syncDataManipulator,
  subscription,
  description = ""
) {
  const fn = function(perspective, returnHash, payload, pushEvent) {
    pushEvent(returnHash, syncDataManipulator(perspective, payload));
  };
  return {
    fn: fn,
    hash: subscription,
    description: description
  };
}
