# genesys-cloud-widget-features
This is an example on how to extend the existing Genesys V2 Widget abilities such as reatime EWT, callback & Send Message. These functions of the widget are NOT officially supported on Genesys Cloud and are part of the Genesys Engage feature stack. These features will be comming native to Genesys Cloud soon (depending on when your reading this they may be already there) This repo is how you can use the open API platform to enable this now very easily.

This project uses a Node.js server and I have also supplied a Dockerfile as I deployed this using Google Cloud Run in my GCP environment, this container is based on industry standards so you can use it in other hosting solutions as well.

Once you have cloned, you will need to setup the following to test locally:

npm init
npm install express
npm install cors
npm install purecloud-platform-client-v2
npm install multer

Next you will need to get the authentication details from teh Genesys Cloud ORG your planning to sue for this. You will need to create a "OAuth2" Code Credentials grant with roels required. Depending on the number of features you want to use eg call back and send message (email) will depend on the number of roles you will require the grant to have.

![](/docs/images/screenShot1.png?raw=true)

You will now need to start the node.js server either directly from yoru localhost or if using a container deploying this to the service your planning to use. for this test purpose you can simply run it locally but before you do as the configuration settings eg: region, clientId & clinetSecret are pulled via environment variables (ready for container use) you will need to set these first before running the app.js

on Linux: export PORT=3000 CLIENTID={ENTER YOUR ID} CLIENTSECRET={ENTER YOUR ID} REGION={ENTER YOUR GC REGION}

Then start the app: node app.js

![](/docs.images/screenShot2.png?raw=true)

In your Genesys Widget config.js you will need to add in the configuration for the services you require. I have included an example of this in teh repo called "exampleWidgetConfig.js" in this exampel and this exampel code im referencing an individual "userId" for the EWT as in demos my queues dont always haven enough traffic to have a realistic EWT. in the "genesys.js" file you can see there is also a function for getting a EWT from a queue that would be used in the real world. Once this is configured you will be able to see the below style of EWT Status.

![](/docs/images/screenShot3.png?raw=true)

![](/docs/images/screenShot4.png?raw=true)

If you are using the other feautres such as the "CallBack" both imeditate and scheduale are supported:

![](/docs/images/screenShot5.png?raw=true)

![](/docs/images/screenShot6.png?raw=true)

For the "Send Message" function, This is acutally send into Genesy Cloud as an Email as an "External Provider" so to render the data entered into the Widet eg Subject and Body. This needs to be built into a agent "Script" within Genesys Cloud. You could use this same code base and use your own externla EMail provider to send the data as an actual external email into Genesys Cloud as an inbound email. For the purposes of this example I have not as differnet peopel will have different email servers etc. This current method works well and removes the need to integrate to an email provider.

![](/docs/images/screenShot7.png?raw=true)