const ZB = require('zeebe-node')
const path = require('path')


console.log("Start-process-instance")
const zbc = new ZB.ZBClient();

/*
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
 */



async function main() {

	process.env['ZEEBE_CLIENT_ID'] = 'nodeapp';
	process.env['ZEEBE_CLIENT_SECRET'] = 'uDbgilrZ0EyItsAWqCJDbZ1l13rHdBov'
	process.env['ZEEBE_TENANT_ID'] = 'blue';
	process.env['ZEEBE_SECURE_CONNECTION'] = false
	process.env['ZEEBE_ADDRESS'] = 'localhost:26500'
	process.env['ZEEBE_AUTHORIZATION_SERVER_URL'] = 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token'
	process.env['ZEEBE_TOKEN_AUDIENCE'] = 'zeebe.camunda.io'
	process.env['CAMUNDA_CREDENTIALS_SCOPES'] = 'Zeebe'
	process.env['CAMUNDA_OAUTH_URL'] = 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token'


	console.log("Client_Id=    ["+process.env.ZEEBE_CLIENT_ID+"]");
	console.log("Tenant_Id=    ["+process.env.ZEEBE_TENANT_ID+"]");
	console.log("Zeebe_Address=["+process.env.ZEEBE_ADDRESS+"]");

	const zbc = new ZB.ZBClient();



	console.log("---------------------- Topology")
	const topology = await zbc.topology();
	console.log(JSON.stringify(topology, null, 2))
	console.log("---------------------- end Topology")

	console.log("-------------- Deploy test.bpmn")

	const deploymentDefault = await zbc.deployResource({
		processFilename: path.join(process.cwd(), 'resources', 'test.bpmn')
	})
	console.log("-------------- DeploymentDefault", deploymentDefault)

	const deploymentBlue = await zbc.deployResource({
		processFilename: path.join(process.cwd(), 'resources', 'test.bpmn'),
		tenantId: 'blue'
	})
	console.log('-------------- Deployment Blue', deploymentBlue)

	console.log("----------------------- CreateProcessInstance in PING")

	/*
	const resultPing = await zbc.createProcessInstance( {
		bpmnProcessId: 'Ping',
		variables: { testData: `process`},
		tenantId: 'red'
	})
	console.log(resultPing)

	const resultPayment = await zbc.createProcessInstance( {
		bpmnProcessId: 'PaymentProcess',
		variables: { customerCredit: 1000},
		tenantId: 'red'
	})
	console.log(resultPayment)
	if (1==1) {
		return
	}
	 */

	console.log("----------------------- CreateProcessInstance")
	for (let i = 0; i < 2; i++) {
		const result = await zbc.createProcessInstance( {
			bpmnProcessId: 'test-process',
			variables: { testData: `process #${i}`},
		})
		console.log(result)
	}

	for (let i = 0; i < 3; i++) {
		const result = await zbc.createProcessInstance( {
			bpmnProcessId: 'test-process',
			variables: { testData: `process #${i}`},
			tenantId: 'blue'
		})
		console.log(result)
	}


	console.log("----------------------- end CreateProcessInstance")




	zbc.createWorker({
		taskType: 'demo-service',
		taskHandler: job => {
			console.log('-------------- Worker [demo-service] received job', job)
			setTimeout(() => {
				console.log(`We deployed, started, and serviced a job in a process instance. If you didn't see any errors, then everything went according to plan. Exiting.`)
				process.exit()
			}, 1000)
			return job.complete()
		}
	})
}
main()