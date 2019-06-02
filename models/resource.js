module.exports=function(sequelize, DataTypes) {
    var resource = sequelize.define("resource", 
    {
        username: DataTypes.STRING,
        scenarioID: DataTypes.STRING,
        userLoginSessionID: DataTypes.STRING,
        ResourceID: DataTypes.STRING,
        Name: DataTypes.STRING,
        Pool: DataTypes.STRING,
        Shift: DataTypes.STRING,
        MaximumQuantity: DataTypes.REAL,
        MinimumAllocationQuantity: DataTypes.REAL,
        AvailableQuantity: DataTypes.REAL,
        Costperunittime: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        Costtimeunit: DataTypes.STRING,
        Costperuse: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        InitialStatus: DataTypes.STRING,
        Status: DataTypes.STRING,
        StatusStartTime: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        PendingStatus: DataTypes.STRING,
        PendingStatusStartTime: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        ResourceOrderID: DataTypes.STRING,
        ReassignedResourceOrderID: DataTypes.STRING,
        SkillLevel: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        Rank: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        Shareable: DataTypes.STRING,
        SharedCount: DataTypes.STRING,
        TBF: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TTR: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TBFTTRDownInterruptionPolicy: DataTypes.STRING,
        FailureProgressType: DataTypes.STRING,
        OffShift: DataTypes.BOOLEAN,
        ScheduledDown: DataTypes.BOOLEAN,
        UnscheduledDown: DataTypes.BOOLEAN,
        Failed: DataTypes.BOOLEAN,
        TotalOrdersServiced: DataTypes.REAL,
        TotalIdleTime: DataTypes.REAL,
        TotalBusyTime: DataTypes.REAL,
        TotalBusyOffShiftTime: DataTypes.REAL,
        TotalReservedTime: DataTypes.REAL,
        TotalDownTime: DataTypes.REAL,
        TotalOffShiftTime: DataTypes.REAL,
        TotalDisabledTime: DataTypes.REAL,
        TotalAllocatedTime: DataTypes.REAL,
        TotalCost: DataTypes.REAL,
        TotalFailedTime: DataTypes.REAL,
        TotalQuantityAllocated: DataTypes.REAL,
        TotalQuantityAllocationTime: DataTypes.REAL,
        TotalReassignedTime: DataTypes.REAL,
        TotalScheduledDownTime: DataTypes.REAL,
        TotalUnscheduledDownTime: DataTypes.REAL,
        QuantityUtilization: DataTypes.REAL,
        Utilization: DataTypes.REAL
    });
    return resource;
};
