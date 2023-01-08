namespace reuse_be.DTO
{
    public class submitRequestMessageDTO
    {
        public string RequestId { get; set; }
        public bool evaluationStatus { get; set; }

        public submitRequestMessageDTO(string requestId, bool evaluationStatus)
        {
            RequestId = requestId;
            this.evaluationStatus = evaluationStatus;
        }
    }
}
