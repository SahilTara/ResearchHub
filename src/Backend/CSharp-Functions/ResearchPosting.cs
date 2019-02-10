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

using System.Collections.Generic;

namespace ResearchHub.Api.CSharp
{
    public static class ResearchPosting
    {
        [FunctionName("ResearchPosting")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "researchPosting/{firebaseId}")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string firebaseId = req.Path.ToString().Replace("/api/researchPosting/", "");
            var firebase = new FirebaseClient("https://research-hub-26239.firebaseio.com/");

            string method = req.Method;

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            
            var data = JsonConvert.DeserializeObject(requestBody);
            

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
            return null;
        }

        private static async Task<IActionResult> ProcessGet(FirebaseClient client, string firebaseId) {

            if (firebaseId.Equals("all", StringComparison.OrdinalIgnoreCase)) {
                var posting = await client.Child("posting").OnceAsync<ResearchPostingObject>();
                if (posting == null) {
                    return new OkObjectResult(new string[0]);    
                } else {
                    return new OkObjectResult(posting);
                }

            } else {
                var posting = await client.Child("posting").OrderBy("Id").EqualTo(firebaseId).OnceAsync<ResearchPostingObject>();
                if (posting == null) {
                    return new OkObjectResult(new string[0]);
                } else {
                    return new OkObjectResult(posting);
                }
            }

          
        }

        private static async Task<IActionResult> ProcessPost(FirebaseClient client, string firebaseId, object data) {
            
            (IActionResult result, ResearchPostingObject posting) = ResearchPostingObject.Create(client, firebaseId, data).Result;
            if (result is BadRequestObjectResult) {
                return result;
            }

            await client.Child("posting").Child(posting.NameAuthor).PutAsync(posting);
            return result;
        }
    }

    internal class ResearchPostingObject {
        
        public string Author { get; set; }

        public string Organization { get; set; }

        public int ParticipantCount { get; set; }

        public string ProjectDescription { get; set; }

        public string ProjectName { get; set; }

        public string Id { get; set; }
        public string NameAuthor { get; private set; }
        public ResearchPostingObject(string author, string organization, int participantCount, string projectDescription, string projectName, string id) {
            Author = author;
            Organization = organization;
            ParticipantCount = participantCount;
            ProjectDescription = projectDescription;
            ProjectName = projectName;
            Id = id;
            NameAuthor = ProjectName + Author;
        }
      
        public async static Task<(IActionResult, ResearchPostingObject)> Create(FirebaseClient client, string firebaseId, dynamic data) {
            string author = data?.author;

            if (string.IsNullOrEmpty(author)) {
                return (new BadRequestObjectResult( new {message = "invalid author"} ), null);
            }
            string organization = data?.organization;
            
            if (string.IsNullOrEmpty(organization)) {
                return (new BadRequestObjectResult( new {message = "invalid organization"} ), null);
            }

            int participantCount = 0;
        

            string projectDescription = data?.projectDescription;

            if (string.IsNullOrEmpty(projectDescription)) {
                return (new BadRequestObjectResult( new {message = "invalid project description"} ), null);
            }


            string projectName = data?.projectName;

            if (string.IsNullOrEmpty(projectName)) {
                return (new BadRequestObjectResult( new {message = "invalid project name"} ), null);
            }



            var posting = new ResearchPostingObject(author,
                                            organization,
                                            participantCount,
                                            projectDescription, 
                                            projectName,
                                            firebaseId);

            var existing = await client.Child("posting").Child(posting.NameAuthor).OnceSingleAsync<ResearchPostingObject>();

            if (existing != null) {
                return (new BadRequestObjectResult( new {message = "Posting for this author and project name already exists."} ), null);
            }

            return ((ActionResult)new OkObjectResult(posting), posting);  
            
        }
         
    }
}
