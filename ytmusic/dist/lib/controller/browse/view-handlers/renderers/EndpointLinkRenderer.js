"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _EndpointLinkRenderer_instances, _EndpointLinkRenderer_getIcon;
Object.defineProperty(exports, "__esModule", { value: true });
const Endpoint_1 = require("../../../../types/Endpoint");
const EndpointHelper_1 = __importDefault(require("../../../../util/EndpointHelper"));
const ViewHelper_1 = __importDefault(require("../ViewHelper"));
const BaseRenderer_1 = __importDefault(require("./BaseRenderer"));
const ICON_BY_BROWSE_ID = {
    'FEmusic_moods_and_genres_category': 'fa fa-music',
    'FEmusic_new_releases': 'fa fa-certificate',
    'FEmusic_charts': 'fa fa-line-chart',
    'FEmusic_moods_and_genres': 'fa fa-smile-o'
};
const ICON_BY_NAME = {
    'YTMUSIC_DID_YOU_MEAN': 'fa fa-question-circle-o', // Our own icon type
    'YTMUSIC_SHOWING_RESULTS_FOR': 'fa fa-info-circle' // Our own icon type
};
const VIEW_NAME_BY_BROWSE_ID = {
    'FEsubscriptions': 'subscriptions'
};
class EndpointLinkRenderer extends BaseRenderer_1.default {
    constructor() {
        super(...arguments);
        _EndpointLinkRenderer_instances.add(this);
    }
    renderToListItem(data) {
        if (!EndpointHelper_1.default.validate(data.endpoint)) {
            return null;
        }
        let targetViewName;
        switch (data.endpoint.type) {
            case Endpoint_1.EndpointType.Search:
                targetViewName = 'search';
                break;
            case Endpoint_1.EndpointType.Browse:
                targetViewName = VIEW_NAME_BY_BROWSE_ID[data.endpoint.payload.browseId] || 'generic';
                break;
            default:
                targetViewName = 'generic';
        }
        const targetView = {
            name: targetViewName,
            endpoint: data.endpoint
        };
        const uri = `${this.uri}/${ViewHelper_1.default.constructUriSegmentFromView(targetView)}`;
        const result = {
            service: 'ytmusic',
            // Setting type to 'album' is important for 'watch' endpoint items, as we
            // Only want this item to be exploded and not others in the same list when
            // It is clicked.
            type: EndpointHelper_1.default.isType(data.endpoint, Endpoint_1.EndpointType.Watch) ? 'album' : 'item-no-menu',
            title: data.title,
            uri
        };
        if (data.subtitle) {
            result.artist = data.subtitle;
        }
        if (data.thumbnail) {
            result.albumart = data.thumbnail;
        }
        else {
            result.icon = __classPrivateFieldGet(this, _EndpointLinkRenderer_instances, "m", _EndpointLinkRenderer_getIcon).call(this, data) || undefined;
        }
        return result;
    }
}
_EndpointLinkRenderer_instances = new WeakSet(), _EndpointLinkRenderer_getIcon = function _EndpointLinkRenderer_getIcon(data) {
    const iconByName = data.icon ? ICON_BY_NAME[data.icon] : null;
    if (iconByName) {
        return iconByName;
    }
    const endpoint = data.endpoint;
    if (EndpointHelper_1.default.isType(endpoint, Endpoint_1.EndpointType.Browse)) {
        return ICON_BY_BROWSE_ID[endpoint.payload.browseId] || 'fa fa-arrow-circle-right';
    }
    else if (EndpointHelper_1.default.isType(endpoint, Endpoint_1.EndpointType.Watch)) {
        return 'fa fa-play-circle';
    }
    return null;
};
exports.default = EndpointLinkRenderer;
//# sourceMappingURL=EndpointLinkRenderer.js.map