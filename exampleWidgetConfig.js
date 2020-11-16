//This is an example V2 Widget config with ewt stats and channel selector config needed for GC
//micro service to work from nodejs server

if(!window._genesys)window._genesys = {};
if(!window._gt)window._gt = [];
    window._genesys.widgets = {
        main: {
            debug: true,
            theme: "dark",
            lang: "en",
            customStylesheetID: "genesys_widgets_custom",
            preload: []
        },
        webchat: {
            userData: {},
            emojis: true,
            cometD: {
                enabled: false
            },
            autoInvite: {
                enabled: false,
                timeToInviteSeconds: 5,
                inviteTimeoutSeconds: 30
            },
            chatButton: {
                enabled: false,
                openDelay: 1000,
                effectDuration: 300,
                hideDuringInvite: true
            },
            uploadsEnabled: false,
            enableCustomHeader: true,
            transport: {
                dataURL: "https://api.mypurecloud.com.au",
                type: "purecloud-v2-sockets",
                deploymentKey: "ENTER_YOUR_DEPLOYMENT_ID",
                orgGuid: "ENTER_YOUR_ORG_ID",
            },
            markdown: true,
            form: {
                wrapper: "<table></table>",
                inputs: [
                {
                    id: "cx_webchat_form_firstname",
                    name: "firstname",
                    maxlength: "100",
                    placeholder: "Required",
                    label: "First Name"
                },
                {
                    id: "cx_webchat_form_lastname",
                    name: "lastname",
                    maxlength: "100",
                    placeholder: "Optional",
                    label: "Last Name"
                },
                {
                    id: "cx_webchat_form_email",
                    name: "email",
                    maxlength: "100",
                    placeholder: "Optional",
                    label: "Email"
                },
                {
                    id: "cx_webchat_form_custom",
                    name: "MemberNo",
                    maxlength: "100",
                    placeholder: "Optional",
                    label: "MemberNo"
                }
                ]
            }
        },
      sendmessage: {
            dataURL: "https://CONTAINER_LOCATION/sendmessage",
            apikey: "",
            SendMessageButton: {
                  enabled: false
            }
      },
      stats: {
            ewt: {
                  dataURL: "https://CONTAINER_LOCATION/status",
                  apiVersion: 'v2',
		          mode: 'ewt2'
            }
      },
      channelselector: {
            ewtRefreshInterval: 10,
            channels: [
                  {
                        enable: true,
                        clickCommand: "WebChat.open",
                        readyEvent: "WebChat.ready",
                        displayName: "Web Chat",
                        i10n: "ChatTitle",
                        icon: "chat",
                        html: "",
                        ewt: {
                              display: true,
                              queue: "ENTER_YOUR_USERID", //in my case is the userId for demos
                              availabilityThresholdMin: 300,
                              availabilityThresholdMax: 3600,
                              hideChannelWhenThresholdMax: false
                        }
                  },
                  {
                        enable: true,
                        clickCommand: "SendMessage.open",
                        readyEvent: "SendMessage.ready",
                        displayName: "Send Message",
                        i10n: "EmailTitle",
                        icon: "email",
                        html: ""
                  },
                  {
                        enable: true,
                        clickCommand: "Callback.open",
                        readyEvent: "Callback.ready",
                        displayName: "Receive a Call",
                        i18n: "CallbackTitle",
                        icon: "call-incoming",
                        html: "",
                        ewt: {
                              display: true,
                              queue: "ENTER_YOUR_USERID", //in my case is the userId for demos
                              availabilityThresholdMin: 300,
                              availabilityThresholdMax: 3600,
                              hideChannelWhenThresholdMax: false
                        }
                  },
                  {
                        enable: true,
                        clickCommand: "CallUs.open",
                        readyEvent: "CallUs.ready",
                        displayName: "Call Us",
                        i10n: "CallusTitle",
                        icon: "call-outgoing",
                        ewt: {
                              display: true,
                              queue: "test", //for demos test will show wait time of 5min regardless of agent or queue status
                              availabilityThresholdMin: 300,
                              availabilityThresholdMax: 3600,
                              hideChannelWhenThresholdMax: false
                        }
                  }
            ]
      },
      callus: {
            contacts: [
                  {
                        displayName: "Customer Support",
                        i18n: "Number001",
                        number: "1234"
                  }
            ],
            hours: [
                  "8am - 8pm Mon - Fri",
                  "10am - 6pm Sat - Sun"
            ]
      },
      callback: {
            dataURL: "https://CONTAINER_LOCATION/callback",
            apiVersion: "",
            callDirection: "USERTERMINATED",
            immediateCallback: true,
            scheduledCallback: false,
            serviceName: "",
            countryCodes: true,
            apikey: ""
      },
      sidebar: {
            showOnStartup: true,
            position: "right",
            expandOnHover: true,
            channels: [
                  {
                        name: "ChannelSelector",
                        clickCommand: "ChannelSelector.open",
                        readyEvent: "ChannelSelector.ready",
                        clickOptions: {},
                        displayName: "Help",
                        displayTitle: "Get help on the channel you like",
                        icon: "agent"
                  }
            ]
      }
    };