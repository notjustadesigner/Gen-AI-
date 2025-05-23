import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, ZAxis
} from 'recharts';
import "../app.css"

function Helpfulness({ data }) {
    const categories = {
        "Writing essays or text summaries": "Writing",
        "Solving math / Science / Physics problems": "STEM",
        "Doing my assignments": "Assignments",
        "Language practice (e.g. translations, grammar)": "Language",
        "Studying / Memorising (e.g. Flashcards, Quizzes, Active Recall etc...)": "Studying",
        "Coding / programming help": "Coding",
        "Research / finding sources": "Research",
        "Creative tasks (stories, art prompts)": "Creative",
        "Study planning / time management": "Planning",
    };

    const scores = {};
    const counts = {};

    Object.keys(categories).forEach(key => {
        scores[key] = { sum: 0, count: 0 };
        counts[key] = 0;
    });

    data.forEach(row => {
        const usageResp = row["For which of these purposes do you use AI?"];
        if (usageResp) {
            const selected = usageResp.split(",").map(s => s.trim());
            selected.forEach(cat => {
                if (counts.hasOwnProperty(cat)) {
                    counts[cat]++;
                }
            });
        }

        Object.keys(categories).forEach(cat => {
            const score = row[`How helpful do you find AI for each of these? (1=Not at all, 5=Extremely) [${cat}]`];
            const num = parseFloat(score);
            if (!isNaN(num)) {
                scores[cat].sum += num;
                scores[cat].count++;
            }
        });
    });

    const chartData = Object.keys(categories).map(cat => ({
        category: categories[cat],
        usage: counts[cat],
        helpfulness: scores[cat].count ? scores[cat].sum / scores[cat].count : 0,
        size: counts[cat] > 0 ? counts[cat] * 2 : 6 // minimum size 6, scale as needed
    }));

    return (
        <div className='chart'>
            <div className='tag'>Top Use Cases</div>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 40 }}>
                    <CartesianGrid stroke='#404040' />
                    <XAxis type="number" dataKey="usage" name="Usage">
                        <Label value="Usage Frequency" offset={-10} position="insideBottom" />
                    </XAxis>
                    <YAxis type="number" dataKey="helpfulness" domain={[1, 5]} name="Helpfulness">
                        <Label value="Average Helpfulness" angle={-90} offset={-10} position="center" />
                    </YAxis>
                    <ZAxis dataKey="size" range={[6, 100]} />
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{ background: "#222", color: "#CFCFCF", border: "1px solid #404040", borderRadius: "1rem" }}
                        itemStyle={{ color: "#CFCFCF" }}
                        labelStyle={{ color: "#CFCFCF" }}
                    />
                    <Scatter name="AI Tasks" data={chartData} fill="#CFCFCF" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Helpfulness;
