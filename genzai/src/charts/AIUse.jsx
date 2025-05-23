import {
    PieChart, Pie, Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import "../app.css"

const COLORS = ['#CFCFCF', '#303030']; // YES: #CFCFCF, NO: #303030

function AIUse({ data }) {
    const aiOutsideSchoolData = (() => {
        const counts = { Yes: 0, No: 0 };

        data.forEach(row => {
            const answer = row["Do you ever use AI tools (ChatGPT or similar) for your learning outside of a school context?"]?.trim();
            if (answer === "Yes" || answer === "No") {
                counts[answer]++;
            }
        });

        // Ensure order: YES first, NO second
        return [
            { name: "Uses AI", value: counts["Yes"] },
            { name: "Not uses AI", value: counts["No"] }
        ];
    })();

    return (
        <div className='chart2'>
            <div className='tag'>Students using AI</div>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        style={{ border: "none" }}
                        data={aiOutsideSchoolData}
                        labelLine={false}
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}% ${name}`}
                        outerRadius={80}
                        dataKey="value"
                    >
                        {aiOutsideSchoolData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ background: "#222", color: "#CFCFCF", border: "1px solid #404040", borderRadius: "1rem" }}
                        itemStyle={{ color: "#CFCFCF" }}
                        labelStyle={{ color: "#CFCFCF" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div >
    );
}

export default AIUse;