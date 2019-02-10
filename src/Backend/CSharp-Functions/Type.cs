using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

using Firebase.Database;
using Firebase.Database.Query;

namespace ResearchHub.Api.CSharp
{
    public static class Type
    {
        [FunctionName("Type")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "type/{firebaseId}")] HttpRequest req,
            ILogger log)
        {

            log.LogInformation("C# type trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            string firebaseId = req.Path.ToString().Replace("/api/type/", "");
            var firebase = new FirebaseClient("https://research-hub-26239.firebaseio.com/");

            string method = req.Method;

            if (string.IsNullOrEmpty(firebaseId)) {
                return new BadRequestObjectResult(new {message = "Please specify a firebase id"} );
            }

            switch(method) {
                case "POST":
                    return ProcessPost(firebase, firebaseId, data).Result;
                case "GET":
                    return ProcessGet(firebase, firebaseId).Result;
                default:
                    break;
            }

            return firebaseId != null
                ? (ActionResult)new OkObjectResult($"Hello, {firebaseId}")
                : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
        }

        private static async Task<IActionResult> ProcessGet(FirebaseClient client, string firebaseId) {
            object typeFound = await client.Child("type").Child(firebaseId).OnceSingleAsync<object>();

            if (typeFound == null) {
                return new BadRequestObjectResult(new {message =  "User with this firebase id doesn't exist"} );
            } else {
                return new OkObjectResult(typeFound);
            }
        }

        private static async Task<IActionResult> ProcessPost(FirebaseClient client, string firebaseId, dynamic data) {
            string typeData = data?.type;
            
            if (string.IsNullOrEmpty(typeData) || (!typeData.Equals("researcher") && !typeData.Equals("participant"))) {
                return new BadRequestObjectResult(new {message = "Invalid type, type can only be 'researcher' or 'participant'"});
            }
            object result = new {type = typeData};
            object typeFound = await client.Child("type").Child(firebaseId).OnceSingleAsync<object>();
            if (typeFound != null) {
                return new BadRequestObjectResult(new {message = "This user already has a type assigned"});
            }
            await client.Child("type").Child(firebaseId).PutAsync(result);
            return new OkObjectResult(result);
        }
    }
}
