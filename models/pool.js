module.exports=function(sequelize, DataTypes) {
    var pool = sequelize.define("pool", 
    {
        username: DataTypes.STRING,
        scenarioID: DataTypes.STRING,
        userLoginSessionID: DataTypes.STRING,
        Name: DataTypes.STRING,
        ParentID: DataTypes.STRING,
        ResourcePoolBlock: DataTypes.INTEGER,
        AutogenerateResources: DataTypes.BOOLEAN,
        Costperunittime: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        Costperuse:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        CosttimeUnit: DataTypes.STRING,
        InitialStatus: DataTypes.STRING,
        InitialResources: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalResources: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        IdleResources: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        BusyResources: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        ReservedResources:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        DownResources: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        DisabledResources:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        AllocatedResources:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        AvailableQuantity:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        Failed: DataTypes.BOOLEAN,
        FailedResources:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        FailureProgressType:
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        HasDistinctResources: DataTypes.BOOLEAN,
        MaximumQuantity:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        MinimumAllocationQuantity:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        OffShift: DataTypes.BOOLEAN,
        OffShiftResources:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        ReassignedResources:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        ScheduledDown: DataTypes.BOOLEAN,
        ScheduledDownResources:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        Shareable: DataTypes.BOOLEAN,
        SharedCount: 
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        Shift: 
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        TBF:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TBFTTRDownInterruptionPolicy:
        {
            type: DataTypes.STRING,
            allowNull: true
        },
        TTR:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        UnscheduledDown: DataTypes.BOOLEAN,
        UnscheduledDownResources:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalOrdersServiced:
        {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        TotalIdleTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalBusyTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalBusyOffShiftTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalReservedTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalDownTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalOffShiftTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalDisabledTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        QuantityUtilization:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalAllocatedTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalCost:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalFailedTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalQuantityAllocated:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalQuantityAllocationTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalReassignedTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalScheduledDownTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        TotalUnscheduledDownTime:
        {
            type: DataTypes.REAL,
            allowNull: true
        },
        Utilization:
        {
            type: DataTypes.REAL,
            allowNull: true
        }
    });
    return pool;
};
