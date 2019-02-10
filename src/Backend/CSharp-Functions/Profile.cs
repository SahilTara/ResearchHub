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
    public static class Profile
    {
        [FunctionName("Profile")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "patch", "post", Route = "profile/{firebaseId}")] HttpRequest req,
            ILogger log)
        {
            
            log.LogInformation("C# HTTP trigger function processed a request.");
            string firebaseId = req.Path.ToString().Replace("/api/profile/", "");
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
                case "PATCH":
                    return ProcessPatch(firebase, firebaseId, data).Result;
                case "GET":
                    return ProcessGet(firebase, firebaseId).Result;
                default:
                    break;
            }
            
            return firebaseId != null
                ? (ActionResult)new OkObjectResult($"Hello, {firebaseId} {req.Method}")
                : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
        }

        private static async Task<IActionResult> ProcessGet(FirebaseClient client, string firebaseId) {
            var profile = await client.Child("profile").Child(firebaseId).OnceSingleAsync<ProfileObject>();

            if (profile == null) {
                return new BadRequestObjectResult(new {message =  "User with this firebase id doesn't exist"} );
            } else {
                return new OkObjectResult(profile);
            }
        }

        private static async Task<IActionResult> ProcessPatch(FirebaseClient client, string firebaseId, object data) {
            var profile = await client.Child("profile").Child(firebaseId).OnceSingleAsync<ProfileObject>();

            if (profile == null) {
                return new BadRequestObjectResult(new {message =  "User with this firebase id doesn't exist"} );
            }

            (IActionResult result, IDictionary<string, object> map) = profile.Update(data);

            if (result is BadRequestObjectResult) {
                return result;
            }

            await client.Child("profile").Child(firebaseId).PatchAsync(map);
            return result;
            
            
        }
        private static async Task<IActionResult> ProcessPost(FirebaseClient client, string firebaseId, object data) {
            
            (IActionResult result, ProfileObject profile) = ProfileObject.Create(client, firebaseId, data).Result;
            if (result is BadRequestObjectResult) {
                return result;
            }

            await client.Child("profile").Child(firebaseId).PutAsync(profile);
            return result;
        }
    }
    internal class ProfileObject {
        
        public string Name { get; set; }

        public DateTime DateOfBirth { get; set; }

        /// <summary>Weight in Kg</summary>
        public double Weight { get; set; }

        /// <summary>Height in cm</summary>
        public double Height { get; set; }

        /// <summary>Race/Demographic</summary>
        public string Demographic { get; set; }

        /// <summary>City</summary>
        public string Location { get; set; }

        public ProfileObject(string name, DateTime dateOfBirth, double weight, double height, string demographic, string location) {
            Name = name;
            DateOfBirth = dateOfBirth;
            Weight = weight;
            Height = height;
            Demographic = demographic;
            Location = location;
        }

        public (IActionResult, IDictionary<string, object>) Update(dynamic data) {
            var map = new Dictionary<string, object>();
            string name = data?.name;

            if (!string.IsNullOrEmpty(name)) {
                map.Add("Name", name);
                Name = name;
            } else if (name != null) {
                return (new BadRequestObjectResult(new {message = "Name cannot be empty."}), null);
            }

            string dob = data?.dateOfBirth;
            DateTime dateOfBirth;
            
            if (DateTime.TryParse(dob, out dateOfBirth) ) {
                map.Add("DateOfBirth", dateOfBirth);
                DateOfBirth = dateOfBirth;
            } else if (dob != null) {
                return (new BadRequestObjectResult(new {message = "Invalid date update request"}), null);
            }
            
            string w = data?.weight;
        
        
            double weight = 0.0; 

            if (double.TryParse(w, out weight) && weight >= 0) {
               map.Add("Weight", weight);
               Weight = weight;
            } else if (weight < 0) {
                 return (new BadRequestObjectResult( new {message = "invalid weight update request"} ), null);
            }

            string h = data?.height;
            double height = 0.0;

            if (double.TryParse(h, out height) && height >= 0) {
                map.Add("Height", height);
                Height = height;
            } else if (height < 0) {
                return (new BadRequestObjectResult( new {message = "invalid height update request"} ), null);
            }

            string demographic = data?.demographic;

            if (!string.IsNullOrEmpty(demographic)) {
                map.Add("Demographic", demographic);
                Demographic = demographic;
            } else if (demographic != null) {
                return (new BadRequestObjectResult( new {message = "invalid demographic update request"} ), null);
            }


            string location = data?.location;

            if (!string.IsNullOrEmpty(location)) {
                map.Add("Location", location);
                Location = location;
            } else if (location != null) {
                return (new BadRequestObjectResult( new {message = "invalid location update request"} ), null);
            }

    


            return ((ActionResult)new OkObjectResult(this), map);  
            
        }
        public async static Task<(IActionResult, ProfileObject)> Create(FirebaseClient client, string firebaseId, dynamic data) {
            string name = data?.name;

            if (string.IsNullOrEmpty(name)) {
                return (new BadRequestObjectResult( new {message = "invalid name"} ), null);
            }
            string dob = data?.dateOfBirth;
            DateTime dateOfBirth;
            
            if (!DateTime.TryParse(dob, out dateOfBirth) ) {
                return (new BadRequestObjectResult( new {message = "invalid dateOfBirth"} ), null);
            }
            
            string w = data?.weight;
        
        
            double weight = 0.0; 

            if (!double.TryParse(w, out weight) || weight < 0) {
                return (new BadRequestObjectResult( new {message = "invalid weight"} ), null);
            }

            string h = data?.height;
            double height = 0.0;

            if (!double.TryParse(h, out height) || height < 0) {
                return (new BadRequestObjectResult( new {message = "invalid height"} ), null);
            }

            string demographic = data?.demographic;

            if (string.IsNullOrEmpty(demographic)) {
                return (new BadRequestObjectResult( new {message = "invalid demographic"} ), null);
            }


            string location = data?.location;

            if (string.IsNullOrEmpty(location)) {
                return (new BadRequestObjectResult( new {message = "invalid location"} ), null);
            }

            var profile = new ProfileObject(name,
                                            dateOfBirth,
                                            weight,
                                            height, 
                                            demographic, 
                                            location);

            var existing = await client.Child("profile").Child(firebaseId).OnceSingleAsync<ProfileObject>();

            if (existing != null) {
                return (new BadRequestObjectResult( new {message = "User already exists."} ), null);
            }
            return ((ActionResult)new OkObjectResult(profile), profile);  
            
        }
         
    }
    
}
