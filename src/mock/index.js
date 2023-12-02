// 引用 Mock
import { hostUrl } from '@/api/http';

const Mock = require('mockjs');
const Random = Mock.Random;

export const StudentData = Mock.mock(hostUrl + 'student/list/page', 'post', {
    'code': '200',
    'data': {
        'records|1-10':
            [
                {
                    'id': Random.integer(1000000000, 9999999999),
                    'studentName': Random.string(5),
                    'studentNumber': Random.integer(2021121000, 2021121999),
                    'studentAcademy': Random.string(10),
                    'studentClass': Random.string(10),
                    'studentGrade': Random.string(10),
                    'photoUrl': Random.image('200x200', '#9876AA', '#4E89BA', 'png', 'hello')
                }
            ],
        'total': 10
    },
    'msg': 'ok'
});


export const courseData = Mock.mock(hostUrl + 'course/list/page', 'post', {
    'code': '200',
    'data': {
        'records|1-10':
            [
                {
                    'id': Random.integer(1000000000, 9999999999),
                    'courseName': Random.string(10),
                    'courseSkillIndex': Random.string(10),
                    'courseWeight': Random.int(1,10)
                }
            ],
        'total': 10
    },
    'msg': 'ok'
});

export const scoreData = Mock.mock(hostUrl + 'score/list/page', 'post', {
    'code': '200',
    'data': {
        'records|1-10':
            [
                {
                    'id': Random.integer(1000000000, 9999999999),
                    'studentName': Random.string(10),
                    'courseName': Random.string(10),
                    'studentScore': Random.int(10,100)
                }
            ],
        'total': 10
    },
    'msg': 'ok'
});

export const academyData = Mock.mock(hostUrl + 'academy/list/page', 'post', {
    'code': '200',
    'data': {
        'records|1-10':
            [
                {
                    'id': Random.integer(1000000000, 9999999999),
                    'academyName': Random.string(5),
                    'academyInfo': Random.string(30),
                    'photoUrl': Random.image('200x200', '#9876AA', '#4E89BA', 'png', 'hello')
                }
            ],
        'total': 10
    },
    'msg': 'ok'
});

export const skillData = Mock.mock(hostUrl + 'skill/list/page', 'post', {
    'code': '200',
    'data': {
        'records|1-10':
            [
                {
                    'id': Random.integer(1000000000, 9999999999),
                    'studentName': Random.string(10),
                    'studentSkillScore': Random.string(10),
                }
            ],
        'total': 10
    },
    'msg': 'ok'
});

export const skillLevelData = Mock.mock(hostUrl + 'skillLevel/list/page', 'post', {
    'code': '200',
    'data': {
        'records|1-10':
            [
                {
                    'id': Random.integer(1000000000, 9999999999),
                    'skillLevel': Random.string(10),
                    'start': Random.int(0, 5),
                    'end': Random.int(5, 10)
                }
            ],
        'total': 10
    },
    'msg': 'ok'
});

export const skillIndexData = Mock.mock(hostUrl + 'skillIndex/list/page', 'post', {
    'code': '200',
    'data': {
        'records|1-10':
            [
                {
                    'id': Random.integer(1000000000, 9999999999),
                    'skillIndexName': Random.string(10),
                }
            ],
        'total': 10
    },
    'msg': 'ok'
});
