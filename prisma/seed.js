const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // Clean existing data
    await prisma.questionAttempt.deleteMany()
    await prisma.application.deleteMany()
    await prisma.question.deleteMany()
    await prisma.topic.deleteMany()
    await prisma.jobPosting.deleteMany()
    await prisma.company.deleteMany()
    await prisma.user.deleteMany()

    console.log('✅ Cleaned existing data')

    // Create Topics
    const topics = await Promise.all([
        prisma.topic.create({ data: { name: 'Logical Reasoning', category: 'APTITUDE', description: 'Logical thinking questions' } }),
        prisma.topic.create({ data: { name: 'Quantitative Aptitude', category: 'APTITUDE', description: 'Math problems' } }),
        prisma.topic.create({ data: { name: 'Verbal Ability', category: 'APTITUDE', description: 'English skills' } }),
        prisma.topic.create({ data: { name: 'Data Structures & Algorithms', category: 'TECHNICAL', description: 'DSA concepts' } }),
        prisma.topic.create({ data: { name: 'Database Management', category: 'TECHNICAL', description: 'SQL and DBMS' } }),
        prisma.topic.create({ data: { name: 'Operating Systems', category: 'TECHNICAL', description: 'OS concepts' } }),
        prisma.topic.create({ data: { name: 'Computer Networks', category: 'TECHNICAL', description: 'Networking' } }),
        prisma.topic.create({ data: { name: 'Web Development', category: 'TECHNICAL', description: 'Web technologies' } }),
    ])
    console.log('✅ Created ' + topics.length + ' topics')

    // Create Questions
    const questionsData = [
        { topicId: topics[0].id, content: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?', options: ['Yes', 'No', 'Cannot be determined', 'Only some'], correctAnswer: 'Yes', explanation: 'Syllogism: If A⊂B and B⊂C, then A⊂C', difficulty: 'EASY' },
        { topicId: topics[0].id, content: 'Find the next: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correctAnswer: '42', explanation: 'Differences: 4,6,8,10,12. Next=30+12=42', difficulty: 'EASY' },
        { topicId: topics[0].id, content: 'Clock shows 3:15. Angle between hands?', options: ['0°', '7.5°', '15°', '22.5°'], correctAnswer: '7.5°', explanation: 'Hour hand moves 7.5° from 3', difficulty: 'MEDIUM' },
        { topicId: topics[0].id, content: 'If 5+3=28, 9+1=810, then 7+4=?', options: ['311', '411', '112', '211'], correctAnswer: '311', explanation: 'Pattern: difference then sum', difficulty: 'HARD' },
        { topicId: topics[0].id, content: 'COMPUTER→RFUVQNPC. PRINTER→?', options: ['QSJOUFS', 'SJOQSFS', 'SFUOJSQ', 'QSJOFSQ'], correctAnswer: 'QSJOUFS', explanation: 'Each letter +1, then reverse', difficulty: 'MEDIUM' },
        { topicId: topics[1].id, content: 'Train 150m crosses pole in 15s. Speed in km/h?', options: ['36', '40', '42', '45'], correctAnswer: '36', explanation: '150/15=10m/s=36km/h', difficulty: 'EASY' },
        { topicId: topics[1].id, content: 'A does work in 12 days, B in 18. Together?', options: ['6.2', '7.2', '8.2', '9.2'], correctAnswer: '7.2', explanation: 'Combined=1/12+1/18', difficulty: 'MEDIUM' },
        { topicId: topics[1].id, content: '40% markup, 20% discount. Profit?', options: ['8%', '10%', '12%', '15%'], correctAnswer: '12%', explanation: 'SP=140×0.8=112', difficulty: 'MEDIUM' },
        { topicId: topics[1].id, content: 'CI for 2 years at 10% is ₹420. Principal?', options: ['₹1800', '₹2000', '₹2200', '₹2500'], correctAnswer: '₹2000', explanation: 'P×0.21=420', difficulty: 'HARD' },
        { topicId: topics[1].id, content: 'Milk:Water=4:1 in 45L. Water to add for 3:2?', options: ['12L', '15L', '18L', '20L'], correctAnswer: '15L', explanation: 'Milk=36L, need water=24L', difficulty: 'HARD' },
        { topicId: topics[2].id, content: 'Ephemeral means:', options: ['Eternal', 'Transient', 'Permanent', 'Steady'], correctAnswer: 'Transient', explanation: 'Both mean short-lived', difficulty: 'EASY' },
        { topicId: topics[2].id, content: '"Bury the hatchet" means:', options: ['Hide', 'Make peace', 'Dig', 'Give up'], correctAnswer: 'Make peace', explanation: 'Idiom for ending conflict', difficulty: 'EASY' },
        { topicId: topics[2].id, content: 'Antonym of Gregarious:', options: ['Sociable', 'Reclusive', 'Friendly', 'Outgoing'], correctAnswer: 'Reclusive', explanation: 'Gregarious=social, reclusive=solitary', difficulty: 'MEDIUM' },
        { topicId: topics[2].id, content: 'Correct: "Neither of students..."', options: ['have their', 'has his', 'has their', 'have his'], correctAnswer: 'has his', explanation: 'Neither takes singular', difficulty: 'MEDIUM' },
        { topicId: topics[2].id, content: 'Error in: "Committee have decided"', options: ['Committee', 'have decided', 'to postpone', 'meeting'], correctAnswer: 'have decided', explanation: 'Committee is singular: has', difficulty: 'HARD' },
        { topicId: topics[3].id, content: 'Balanced BST insert time?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 'O(log n)', explanation: 'Height is log n', difficulty: 'EASY' },
        { topicId: topics[3].id, content: 'QuickSort worst case?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correctAnswer: 'O(n²)', explanation: 'When pivot is always min/max', difficulty: 'EASY' },
        { topicId: topics[3].id, content: 'LRU cache uses:', options: ['Array', 'Stack', 'HashMap+DLL', 'Queue'], correctAnswer: 'HashMap+DLL', explanation: 'O(1) access and removal', difficulty: 'MEDIUM' },
        { topicId: topics[3].id, content: 'Merge sort space?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 'O(n)', explanation: 'Needs auxiliary array', difficulty: 'MEDIUM' },
        { topicId: topics[3].id, content: 'Shortest path with negative edges?', options: ['Dijkstra', 'Bellman-Ford', 'BFS', 'Floyd'], correctAnswer: 'Bellman-Ford', explanation: 'Handles negative weights', difficulty: 'HARD' },
        { topicId: topics[4].id, content: 'Which NF removes transitive dependency?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctAnswer: '3NF', explanation: '3NF eliminates transitive deps', difficulty: 'EASY' },
        { topicId: topics[4].id, content: 'Index purpose?', options: ['Store data', 'Speed queries', 'Constraints', 'Backup'], correctAnswer: 'Speed queries', explanation: 'Faster retrieval', difficulty: 'EASY' },
        { topicId: topics[4].id, content: 'Filter groups with?', options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], correctAnswer: 'HAVING', explanation: 'HAVING filters after GROUP BY', difficulty: 'MEDIUM' },
        { topicId: topics[4].id, content: 'ACID stands for?', options: ['Atomicity,Consistency,Isolation,Durability', 'Auto,Calc,Insert,Delete'], correctAnswer: 'Atomicity,Consistency,Isolation,Durability', explanation: 'Transaction properties', difficulty: 'EASY' },
        { topicId: topics[4].id, content: 'B+ tree stores data where?', options: ['Root', 'Internal', 'Leaf', 'All'], correctAnswer: 'Leaf', explanation: 'Only leaf nodes have data', difficulty: 'HARD' },
        { topicId: topics[5].id, content: 'What is deadlock?', options: ['CPU wait', 'Circular wait', 'Crash', 'Memory error'], correctAnswer: 'Circular wait', explanation: 'Processes waiting for each other', difficulty: 'EASY' },
        { topicId: topics[5].id, content: 'Virtual memory purpose?', options: ['Speed CPU', 'Run larger programs', 'Backup', 'Encrypt'], correctAnswer: 'Run larger programs', explanation: 'Uses disk as RAM', difficulty: 'EASY' },
        { topicId: topics[5].id, content: 'Which causes starvation?', options: ['Round Robin', 'FCFS', 'Priority', 'SJF'], correctAnswer: 'Priority', explanation: 'Low priority never executes', difficulty: 'MEDIUM' },
        { topicId: topics[5].id, content: 'Best page replacement?', options: ['FIFO', 'LRU', 'Optimal', 'Random'], correctAnswer: 'Optimal', explanation: 'Replaces page not used longest', difficulty: 'MEDIUM' },
        { topicId: topics[5].id, content: 'NOT a deadlock condition?', options: ['Mutual Exclusion', 'Hold Wait', 'Preemption', 'Circular Wait'], correctAnswer: 'Preemption', explanation: 'No-preemption is condition', difficulty: 'HARD' },
        { topicId: topics[6].id, content: 'OSI routing layer?', options: ['Physical', 'Data Link', 'Network', 'Transport'], correctAnswer: 'Network', explanation: 'Layer 3 routes', difficulty: 'EASY' },
        { topicId: topics[6].id, content: 'HTTPS default port?', options: ['80', '443', '8080', '22'], correctAnswer: '443', explanation: 'HTTP=80, HTTPS=443', difficulty: 'EASY' },
        { topicId: topics[6].id, content: 'Connection-oriented protocol?', options: ['UDP', 'TCP', 'IP', 'ICMP'], correctAnswer: 'TCP', explanation: 'TCP establishes connection', difficulty: 'EASY' },
        { topicId: topics[6].id, content: 'ARP purpose?', options: ['IP to MAC', 'MAC to IP', 'Route', 'Encrypt'], correctAnswer: 'IP to MAC', explanation: 'Address resolution', difficulty: 'MEDIUM' },
        { topicId: topics[6].id, content: 'Secure file transfer?', options: ['FTP', 'SFTP', 'HTTP', 'SMTP'], correctAnswer: 'SFTP', explanation: 'SSH-based transfer', difficulty: 'MEDIUM' },
        { topicId: topics[7].id, content: '"use strict" does?', options: ['Faster', 'Strict mode', 'Compile', 'ES6'], correctAnswer: 'Strict mode', explanation: 'Catches errors', difficulty: 'EASY' },
        { topicId: topics[7].id, content: 'display:flex creates?', options: ['Block', 'Flex container', 'Grid', 'Inline'], correctAnswer: 'Flex container', explanation: 'Flexbox layout', difficulty: 'EASY' },
        { topicId: topics[7].id, content: 'Idempotent HTTP method?', options: ['POST', 'PUT', 'PATCH', 'None'], correctAnswer: 'PUT', explanation: 'Same result on repeat', difficulty: 'MEDIUM' },
        { topicId: topics[7].id, content: 'useMemo purpose?', options: ['State', 'Memoize', 'Side effects', 'Refs'], correctAnswer: 'Memoize', explanation: 'Caches calculations', difficulty: 'MEDIUM' },
        { topicId: topics[7].id, content: 'localStorage vs sessionStorage?', options: ['localStorage faster', 'session persists', 'local persists', 'Same'], correctAnswer: 'local persists', explanation: 'localStorage survives close', difficulty: 'MEDIUM' },
    ]

    const questions = await Promise.all(
        questionsData.map((q) =>
            prisma.question.create({
                data: {
                    content: q.content,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    explanation: q.explanation,
                    difficulty: q.difficulty,
                    topicId: q.topicId,
                },
            })
        )
    )
    console.log('✅ Created ' + questions.length + ' questions')

    // Create Students
    const hashedPassword = await bcrypt.hash('student123', 10)
    const students = await Promise.all([
        prisma.user.create({ data: { email: 'rahul@example.com', password: hashedPassword, name: 'Rahul Sharma', role: 'STUDENT', rollNumber: 'CS2021001', cgpa: 9.2, branch: 'Computer Science', graduationYear: 2025, skills: ['React', 'Node.js', 'Python'] } }),
        prisma.user.create({ data: { email: 'priya@example.com', password: hashedPassword, name: 'Priya Patel', role: 'STUDENT', rollNumber: 'IT2021002', cgpa: 8.5, branch: 'Information Technology', graduationYear: 2025, skills: ['Java', 'Spring Boot', 'MySQL'] } }),
        prisma.user.create({ data: { email: 'amit@example.com', password: hashedPassword, name: 'Amit Kumar', role: 'STUDENT', rollNumber: 'CS2021003', cgpa: 7.8, branch: 'Computer Science', graduationYear: 2025, skills: ['Python', 'Django', 'PostgreSQL'] } }),
        prisma.user.create({ data: { email: 'sneha@example.com', password: hashedPassword, name: 'Sneha Gupta', role: 'STUDENT', rollNumber: 'ECE2021004', cgpa: 9.0, branch: 'Electronics', graduationYear: 2025, skills: ['JavaScript', 'React', 'MongoDB'] } }),
        prisma.user.create({ data: { email: 'vikram@example.com', password: hashedPassword, name: 'Vikram Singh', role: 'STUDENT', rollNumber: 'CS2021005', cgpa: 8.2, branch: 'Computer Science', graduationYear: 2025, skills: ['C++', 'DSA', 'Algorithms'] } }),
    ])
    console.log('✅ Created ' + students.length + ' students (password: student123)')

    // Create Companies
    const companyPassword = await bcrypt.hash('company123', 10)
    const companies = await Promise.all([
        prisma.company.create({ data: { email: 'hr@techcorp.com', password: companyPassword, name: 'TechCorp Solutions', description: 'Software development company' } }),
        prisma.company.create({ data: { email: 'hr@innovatesoft.com', password: companyPassword, name: 'InnovateSoft', description: 'AI and ML startup' } }),
        prisma.company.create({ data: { email: 'hr@datasystems.com', password: companyPassword, name: 'DataSystems Inc', description: 'Data analytics provider' } }),
    ])
    console.log('✅ Created ' + companies.length + ' companies (password: company123)')

    // Create Jobs
    const jobs = await Promise.all([
        prisma.jobPosting.create({ data: { companyId: companies[0].id, title: 'Frontend Developer', description: 'React developer needed', requiredSkills: ['React', 'JavaScript', 'CSS'], minCGPA: 7.5, salary: '₹12 LPA', location: 'Bangalore' } }),
        prisma.jobPosting.create({ data: { companyId: companies[0].id, title: 'Backend Developer', description: 'Node.js developer', requiredSkills: ['Node.js', 'MongoDB', 'Express'], minCGPA: 8.0, salary: '₹15 LPA', location: 'Hyderabad' } }),
        prisma.jobPosting.create({ data: { companyId: companies[1].id, title: 'Full Stack Developer', description: 'Full stack role', requiredSkills: ['React', 'Node.js', 'PostgreSQL'], minCGPA: 8.5, salary: '₹18 LPA', location: 'Mumbai' } }),
        prisma.jobPosting.create({ data: { companyId: companies[2].id, title: 'Data Engineer', description: 'Data pipelines', requiredSkills: ['Python', 'SQL', 'Spark'], minCGPA: 8.0, salary: '₹14 LPA', location: 'Pune' } }),
    ])
    console.log('✅ Created ' + jobs.length + ' job postings')

    // Create Attempts
    const attempts = []
    for (const student of students) {
        const numAttempts = Math.floor(Math.random() * 6) + 10
        const shuffled = questions.slice().sort(() => Math.random() - 0.5).slice(0, numAttempts)
        for (const q of shuffled) {
            attempts.push(prisma.questionAttempt.create({
                data: { userId: student.id, questionId: q.id, isCorrect: Math.random() > 0.4, timeTaken: Math.floor(Math.random() * 150) + 30 }
            }))
        }
    }
    await Promise.all(attempts)
    console.log('✅ Created ' + attempts.length + ' question attempts')

    // Create Applications
    await Promise.all([
        prisma.application.create({ data: { studentId: students[0].id, jobPostingId: jobs[0].id, matchScore: 0.85, status: 'SHORTLISTED' } }),
        prisma.application.create({ data: { studentId: students[1].id, jobPostingId: jobs[1].id, matchScore: 0.72, status: 'APPLIED' } }),
        prisma.application.create({ data: { studentId: students[3].id, jobPostingId: jobs[0].id, matchScore: 0.91, status: 'SELECTED' } }),
    ])
    console.log('✅ Created applications')

    console.log('')
    console.log('🎉 Seed completed!')
    console.log('')
    console.log('📧 Test Accounts:')
    console.log('   Students: rahul@example.com (password: student123)')
    console.log('   Companies: hr@techcorp.com (password: company123)')
}

main()
    .catch((e) => { console.error('Error:', e); process.exit(1) })
    .finally(() => prisma.$disconnect())
