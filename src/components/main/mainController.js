const cronJob = require('cron').CronJob;
const notifier = require('node-notifier');

const generateJobPattern = (date, time, repeat) => {
    const timeArray = time.split(':');
    const dateArray = date.split('-');
    const month = dateArray[1] === '01' ? '0' : dateArray[1] - 1;

    return `0 ${timeArray[1]} ${timeArray[0]} ${repeat ? '*' : dateArray[2]} ${month} *`
};

const scheduleJobs = () => {
    cronJobs.forEach(job => job.stop());
    cronJobs = [];

    jobs.forEach(job => {
        cronJobs.push(
            new cronJob(job.pattern, () => {
                notifier.notify({
                    title: job.title,
                    message: job.message,
                    icon: job.icon
                });
            })
        )
    });

    cronJobs.forEach(job => job.start());
}

let cronJobs = [];
let jobs = [];

export default {
    preview(memento) {
        notifier.notify({
            title: memento.title,
            message: memento.message,
            icon: memento.icon
        });
    },

    save(memento) {
        const pattern = generateJobPattern(
                            memento.settings.date,
                            memento.settings.time,
                            memento.settings.repeat
                        );

        const jobExist = jobs.find(job => job.id === memento.id);

        if (jobExist) {
            jobs = jobs.map(job => {
                if (job.id === memento.id) {
                    job.pattern = pattern;
                    job.title   = memento.title;
                    job.message = memento.message;
                    job.icon    = memento.icon; 
                }

                return job;
            });
        } else {
            jobs.push({
                id: memento.id,
                pattern,
                title: memento.title,
                message: memento.message,
                icon: memento.icon
            });
        }

        scheduleJobs();
    }
}