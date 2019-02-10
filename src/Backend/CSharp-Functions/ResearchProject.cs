namespace CSharp_Functions
{
    public class ResearchProject
    {
        public string author { get; set;}

        public string organisation {get; set;}

        public string projectName {get; set;}

        public string projectDescription {get; set;}

        public int participantCount {get; set;}

        public ResearchProject() {

        }

        public ResearchProject(string _author, string _organisation, string _projectName, string _projectDescription, int _participantCount) {
            author = _author;
            organisation = _organisation;
            projectName = _projectName;
            projectDescription = _projectDescription;
            participantCount = _participantCount;
        }
    }
}