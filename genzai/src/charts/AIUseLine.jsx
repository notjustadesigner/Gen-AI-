// AIUseLine.jsx
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import "../app.css"

function AIUseLine({ data }) {
    const frequencyCategories = [
        "Daily",
        "Several times per week",
        "Once a week",
        "A few times per month",
        "Only during weekends",
    ];

    const groupCounts = Object.fromEntries(frequencyCategories.map(label => [label, 0]));

    data.forEach(row => {
        const response = row["How often do you use AI for school related tasks?"]?.trim();
        if (groupCounts.hasOwnProperty(response)) {
            groupCounts[response]++;
        }
    });

    // Sort categories by count descending
    const sortedCategories = [...frequencyCategories].sort(
        (a, b) => groupCounts[b] - groupCounts[a]
    );

    // Assign opacities: 0.8, 0.6, 0.4, 0.2, 0.1 (last one gets 0.1 to avoid 0)
    const baseColor = "#CFCFCF";
    const opacities = [0.9, 0.5, 0.3, 0.2, 0.1];
    const categoryColors = {};
    sortedCategories.forEach((cat, idx) => {
        categoryColors[cat] = `rgba(207, 207, 207, ${opacities[idx]})`;
    });

    const days = Array.from({ length: 60 }, (_, i) => {
        return {
            day: `Day ${Math.floor(i / 2) + 1} ${i % 2 === 0 ? 'AM' : 'PM'}`,
            Daily: 0,
            "Several times per week": 0,
            "Once a week": 0,
            "A few times per month": 0,
            "Only during weekends": 0,
        };
    });

    for (let i = 0; i < 60; i++) {
        // Daily: simulate usage every morning
        if (i % 2 === 0) {
            days[i]["Daily"] = groupCounts["Daily"];
        }

        // Several times/week (approx 12 unique days = 24 half-day slots)
        if ([2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46].includes(i)) {
            days[i]["Several times per week"] = groupCounts["Several times per week"];
        }

        // Once a week (4 times → 8 half-day slots)
        if ([6, 18, 30, 42].includes(i)) {
            days[i]["Once a week"] = groupCounts["Once a week"];
        }

        // Few times per month (4 times too)
        if ([4, 16, 32, 48].includes(i)) {
            days[i]["A few times per month"] = groupCounts["A few times per month"];
        }

        // Weekends only (assuming Sat/Sun fall every 7 days → indexes 10-11, 24-25, etc.)
        const realDayIndex = Math.floor(i / 2);
        const isWeekend = realDayIndex % 7 === 5 || realDayIndex % 7 === 6;
        if (isWeekend && i % 2 === 0) {
            days[i]["Only during weekends"] = groupCounts["Only during weekends"];
        }
    }

    return (
        <div className='chart'>
            <div className='tag'>AI Usage per Month</div>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={days}>
                    <CartesianGrid strokeDasharray="3 3" stroke='#404040' />

                    <YAxis allowDecimals={false} />
                    <Tooltip
                        contentStyle={{ background: "#222", color: "rgba(207, 207, 207, 1)", border: "1px solid #404040", borderRadius: "1rem" }}
                    />
                    <Legend wrapperStyle={{ marginTop: "1rem" }} />
                    {sortedCategories.map(freq => (
                        <Area
                            key={freq}
                            type="monotone"
                            dataKey={freq}
                            stackId="1"
                            stroke={categoryColors[freq]}
                            fill={categoryColors[freq]}
                            fillOpacity={1}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AIUseLine;

