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
            { name: "Yes", value: counts["Yes"] },
            { name: "No", value: counts["No"] }
        ];
    })();

    return (
        <div className='chart'>
            <div className='tag'>AI Use Outside of School Context</div>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        style={{ border: "none" }}
                        data={aiOutsideSchoolData}
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        dataKey="value"
                    >
                        {aiOutsideSchoolData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#222", color: "#CFCFCF", border: "1px solid #404040", borderRadius: "1rem" }} />
                </PieChart>
            </ResponsiveContainer>
        </div >
    );
}

export default AIUse;