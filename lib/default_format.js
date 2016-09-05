
var counters = function (key, value, ts, bucket, partNames)
{
    var listKeys = key.split('.');
    var act = listKeys.slice(partNames.length, listKeys.length).join('.');
    var record = {
		"act":act || '',
		"val":value,
		"@timestamp": ts
	};

    partNames.forEach(function(partName, index)
    {
        record[partName] = listKeys[index] || '';
    });

    bucket.push(record);
	return 1;
}

var timers = function (key, series, ts, bucket, partNames)
{
    var listKeys = key.split('.');
    var act = listKeys.slice(partNames.length, listKeys.length).join('.');
    for (keyTimer in series)
    {
        var record = {
            "act":act || '',
            "val":series[keyTimer],
            "@timestamp": ts
        };

        partNames.forEach(function(partName, index)
        {
            record[partName] = listKeys[index] || '';
        });

        bucket.push(record);
    }
	return series.length;
}

var timer_data = function (key, value, ts, bucket, partNames)
{
    var listKeys = key.split('.');
    var act = listKeys.slice(partNames.length, listKeys.length).join('.');
    value["@timestamp"] = ts;
    value["act"] = act || '';

    partNames.forEach(function(partName, index)
    {
        value[partName] = listKeys[index] || '';
    });

    if (value['histogram'])
    {
        for (var keyH in value['histogram'])
        {
            value[keyH] = value['histogram'][keyH];
        }
        delete value['histogram'];
    }

    bucket.push(value);
}

exports.counters   = counters;
exports.timers     = timers;
exports.timer_data = timer_data;
exports.gauges     = counters;
