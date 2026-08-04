public class EmployeeValidationClient
{
    private readonly HttpClient _httpClient;

    public EmployeeValidationClient(
        HttpClient httpClient
    )
    {
        _httpClient = httpClient;
    }

    public async Task<bool> EmployeeExists(
        int employeeId
    )
    {
        var response =
            await _httpClient.GetAsync(
                $"/api/employees/{employeeId}"
            );

        return response.IsSuccessStatusCode;
    }
}