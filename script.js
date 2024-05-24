document.getElementById('file-input').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const scheduleData = JSON.parse(e.target.result);
                generateSchedule(scheduleData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };
        reader.readAsText(file);
    }
}

function generateSchedule(schedule) {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = ''; // Очищення попереднього розкладу
    schedule.schedule.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';

        const dateElement = document.createElement('div');
        dateElement.className = 'date';
        dateElement.textContent = `Date: ${day.date}`;
        dayElement.appendChild(dateElement);

        day.lessonList.forEach(lesson => {
            const lessonElement = document.createElement('div');
            lessonElement.className = 'lesson';

            const subjectElement = document.createElement('div');
            subjectElement.className = 'subject';
            subjectElement.textContent = `Subject: ${lesson.subject}`;
            lessonElement.appendChild(subjectElement);

            const timeElement = document.createElement('div');
            timeElement.className = 'time';
            timeElement.textContent = `Time: ${lesson.time}`;
            lessonElement.appendChild(timeElement);

            const teacherElement = document.createElement('div');
            teacherElement.className = 'teacher';
            teacherElement.textContent = `Teacher: ${lesson.teacher}`;
            lessonElement.appendChild(teacherElement);

            const classroomElement = document.createElement('div');
            classroomElement.className = 'classroom';
            classroomElement.textContent = `Classroom: ${lesson.classroom}`;
            lessonElement.appendChild(classroomElement);

            dayElement.appendChild(lessonElement);
        });

        scheduleContainer.appendChild(dayElement);
    });
}
