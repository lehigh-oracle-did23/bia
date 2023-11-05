"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var askar_1 = require("@aries-framework/askar");
var core_1 = require("@aries-framework/core");
var node_1 = require("@aries-framework/node");
var aries_askar_nodejs_1 = require("@hyperledger/aries-askar-nodejs");
var initializeBobAgent = function () { return __awaiter(void 0, void 0, void 0, function () {
    var config, agent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = {
                    label: "demo-agent-bob",
                    walletConfig: {
                        id: "mainBob",
                        key: "demoagentbob00000000000000000000",
                    },
                };
                agent = new core_1.Agent({
                    config: config,
                    modules: {
                        askar: new askar_1.AskarModule({ ariesAskar: aries_askar_nodejs_1.ariesAskar }),
                        connections: new core_1.ConnectionsModule({ autoAcceptConnections: true }),
                    },
                    dependencies: node_1.agentDependencies,
                });
                // Register a simple `WebSocket` outbound transport
                agent.registerOutboundTransport(new core_1.WsOutboundTransport());
                // Register a simple `Http` outbound transport
                agent.registerOutboundTransport(new core_1.HttpOutboundTransport());
                // Initialize the agent
                return [4 /*yield*/, agent.initialize()];
            case 1:
                // Initialize the agent
                _a.sent();
                return [2 /*return*/, agent];
        }
    });
}); };
var initializeAcmeAgent = function () { return __awaiter(void 0, void 0, void 0, function () {
    var config, agent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = {
                    label: "demo-agent-acme",
                    walletConfig: {
                        id: "mainAcme",
                        key: "demoagentacme0000000000000000000",
                    },
                    endpoints: ["http://localhost:3001"],
                };
                agent = new core_1.Agent({
                    config: config,
                    modules: {
                        askar: new askar_1.AskarModule({ ariesAskar: aries_askar_nodejs_1.ariesAskar }),
                        connections: new core_1.ConnectionsModule({ autoAcceptConnections: true }),
                    },
                    dependencies: node_1.agentDependencies,
                });
                // Register a simple `WebSocket` outbound transport
                agent.registerOutboundTransport(new core_1.WsOutboundTransport());
                // Register a simple `Http` outbound transport
                agent.registerOutboundTransport(new core_1.HttpOutboundTransport());
                // Register a simple `Http` inbound transport
                agent.registerInboundTransport(new node_1.HttpInboundTransport({ port: 3001 }));
                // Initialize the agent
                return [4 /*yield*/, agent.initialize()];
            case 1:
                // Initialize the agent
                _a.sent();
                return [2 /*return*/, agent];
        }
    });
}); };
var createNewInvitation = function (agent) { return __awaiter(void 0, void 0, void 0, function () {
    var outOfBandRecord;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.oob.createInvitation()];
            case 1:
                outOfBandRecord = _a.sent();
                return [2 /*return*/, {
                        invitationUrl: outOfBandRecord.outOfBandInvitation.toUrl({
                            domain: "https://example.org",
                        }),
                        outOfBandRecord: outOfBandRecord,
                    }];
        }
    });
}); };
var createLegacyInvitation = function (agent) { return __awaiter(void 0, void 0, void 0, function () {
    var invitation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.oob.createLegacyInvitation()];
            case 1:
                invitation = (_a.sent()).invitation;
                return [2 /*return*/, invitation.toUrl({ domain: "https://example.org" })];
        }
    });
}); };
var receiveInvitation = function (agent, invitationUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var outOfBandRecord;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.oob.receiveInvitationFromUrl(invitationUrl)];
            case 1:
                outOfBandRecord = (_a.sent()).outOfBandRecord;
                return [2 /*return*/, outOfBandRecord];
        }
    });
}); };
var setupConnectionListener = function (agent, outOfBandRecord, cb) {
    agent.events.on(core_1.ConnectionEventTypes.ConnectionStateChanged, function (_a) {
        var payload = _a.payload;
        if (payload.connectionRecord.outOfBandId !== outOfBandRecord.id)
            return;
        if (payload.connectionRecord.state === core_1.DidExchangeState.Completed) {
            // the connection is now ready for usage in other protocols!
            console.log("Connection for out-of-band id ".concat(outOfBandRecord.id, " completed"));
            // Custom business logic can be included here
            // In this example we can send a basic message to the connection, but
            // anything is possible
            cb();
            // We exit the flow
            process.exit(0);
        }
    });
};
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var bobAgent, acmeAgent, _a, outOfBandRecord, invitationUrl;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("Initializing Bob agent...");
                return [4 /*yield*/, initializeBobAgent()];
            case 1:
                bobAgent = _b.sent();
                console.log("Initializing Acme agent...");
                return [4 /*yield*/, initializeAcmeAgent()];
            case 2:
                acmeAgent = _b.sent();
                console.log("Creating the invitation as Acme...");
                return [4 /*yield*/, createNewInvitation(acmeAgent)];
            case 3:
                _a = _b.sent(), outOfBandRecord = _a.outOfBandRecord, invitationUrl = _a.invitationUrl;
                console.log("Listening for connection changes...");
                setupConnectionListener(acmeAgent, outOfBandRecord, function () {
                    return console.log("We now have an active connection to use in the following tutorials");
                });
                console.log("Accepting the invitation as Bob...");
                return [4 /*yield*/, receiveInvitation(bobAgent, invitationUrl)];
            case 4:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.default = run;
void run();
