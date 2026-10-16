using SteamEngineIisSlotBroker;

namespace SteamEngineIisSlotBroker.Tests;

public sealed class BrokerProtocolTests
{
    [Fact]
    public void InspectHasExactlyItsTwoRequestFields()
    {
        var request = BrokerProtocol.Parse(System.Text.Encoding.UTF8.GetBytes(
            "{\"protocolVersion\":1,\"operation\":\"inspect\"}"));

        Assert.Equal(BrokerOperation.Inspect, request.Operation);
        Assert.Null(request.LeaseId);
    }

    [Fact]
    public void SwitchRequiresOnlyAValidOpaqueLeaseId()
    {
        var request = BrokerProtocol.Parse(System.Text.Encoding.UTF8.GetBytes(
            "{\"protocolVersion\":1,\"operation\":\"switch\",\"leaseId\":\"abc_123\"}"));

        Assert.Equal(BrokerOperation.Switch, request.Operation);
        Assert.Equal("abc_123", request.LeaseId);
    }

    [Fact]
    public void MalformedAndDuplicateRequestsFailClosed()
    {
        Assert.Throws<BrokerProtocolException>(() => BrokerProtocol.Parse(System.Text.Encoding.UTF8.GetBytes("{")));
        var duplicate = Assert.Throws<BrokerProtocolException>(() => BrokerProtocol.Parse(
            System.Text.Encoding.UTF8.GetBytes(
                "{\"protocolVersion\":1,\"operation\":\"inspect\",\"operation\":\"switch\"}")));
        Assert.Equal("unknown-field", duplicate.Code);
    }
}
