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
                    's_id': Random.integer(1000000000, 9999999999),
                    's_name': Random.string(5),
                    's_number': Random.integer(2021121000, 2021121999),
                    's_academy': Random.string(10),
                    's_class': Random.string(10),
                    's_grade': Random.string(10),
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
                    'c_id': Random.integer(1000000000, 9999999999),
                    'c_name': Random.string(10),
                    'c_skillIndex': Random.string(10),
                    'c_weight': Random.int(1,10)
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
                    'scoreId': Random.integer(1000000000, 9999999999),
                    'studentName': Random.string(10),
                    'courseName': Random.string(10)
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
                    'a_id': Random.integer(1000000000, 9999999999),
                    'a_name': Random.string(5),
                    'a_info': Random.string(30),
                    'photoUrl': Random.image('200x200', '#9876AA', '#4E89BA', 'png', 'hello')
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
                    's_id': Random.integer(1000000000, 9999999999),
                    's_level': Random.string(10),
                    's_left': Random.int(0, 5),
                    's_right': Random.int(5, 10)
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
                    's_id': Random.integer(1000000000, 9999999999),
                    's_name': Random.string(10),
                    's_weight': Random.int(1, 5)
                }
            ],
        'total': 10
    },
    'msg': 'ok'
});
