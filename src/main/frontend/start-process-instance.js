const ZB = require('zeebe-node');
// const ZB = require('../dist')

console.log("ZeebeAddress is ["+process.env.ZEEBE_ADDRESS+"]");

const jobs = (async () => {
	//const zbc = new ZB.ZBClient();

	const zbc = new ZB.ZBClient(
		{
			camundaCloud: {
				clientId: '9yK0CkyGu8XgAE1j4dlQS4YWbTcpckbV',
				clientSecret: 'pKMyF~j~MLrCES.JIOH4_cSDzDvMtxL7B93VaAxNA~x2vfxtQ.V.GaZUE326vmlK',
				clusterId: '4b421869-b847-44af-95b5-f9bb544276e2',
				clusterRegion: 'bru-2' // optional, defaults to bru-2
			},
			onConnectionError: () => console.log('Connection Error'),
			onReady: () => console.log('Ready to work'),

		}
	)

	console.log("---------------------- Topology")
	const topology = await zbc.topology();
	console.log(JSON.stringify(topology, null, 2))
	console.log("---------------------- end Topology")

	console.log("----------------------- CreateProcessInstance")
	for (let i = 0; i < 10; i++) {
		const result = await zbc.createProcessInstance('test-process', {
			testData: `process #${i}`,
		})
		console.log(result)
	}
	console.log("----------------------- end CreateProcessInstance")


})()
