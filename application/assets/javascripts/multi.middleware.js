/**
 * Multiple actions middleware for Redux
 *
 * @author Marco Solazzi
 * @copyright (c) AQuest
 * @module multi.middleware
 */


function multiActionsMiddleware({dispatch}) {
    return next => action =>
        Array.isArray(action)
        ? action.forEach(dispatch)
        : next(action);
}

export default multiActionsMiddleware;