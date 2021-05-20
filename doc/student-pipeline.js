[{
    $match: {
        _id: '18038684-f799-4bf1-b17e-8b857ab3585e'
    }
}, {
    $lookup: {
        from: 'enrollments',
        localField: '_id',
        foreignField: 'student',
        as: 'enrolls'
    }
}, {
    $unwind: {
        path: '$enrolls',
        preserveNullAndEmptyArrays: true
    }
}, {
    $lookup: {
        from: 'jobOpenings',
        localField: 'enrolls.job_opening',
        foreignField: '_id',
        as: 'jobOpenings'
    }
}, {
    $unwind: {
        path: '$jobOpenings',
        preserveNullAndEmptyArrays: true
    }
}, {
    $group: {
        _id: '$_id',
        name: {
            $first: '$name'
        },
        surname: {
            $first: '$surname'
        },
        lastname: {
            $first: '$lastname'
        },
        qualification: {
            $first: '$qualification'
        },
        languages: {
            $first: '$languages'
        },
        job_experiences: {
            $first: '$job_experiences'
        },
        enrolls: {
            $push: '$enrolls'
        },
        jobOpenings: {
            $push: '$jobOpenings'
        }
    }
}]

const agg = [
    {
        '$match': {
            '_id': '18038684-f799-4bf1-b17e-8b857ab3585e'
        }
    }, {
        '$lookup': {
            'from': 'enrollments',
            'localField': '_id',
            'foreignField': 'student',
            'as': 'enrolls'
        }
    }, {
        '$unwind': {
            'path': '$enrolls',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$lookup': {
            'from': 'jobOpenings',
            'localField': 'enrolls.job_opening',
            'foreignField': '_id',
            'as': 'jobOpenings'
        }
    }, {
        '$unwind': {
            'path': '$jobOpenings',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$group': {
            '_id': '$_id',
            'name': {
                '$first': '$name'
            },
            'surname': {
                '$first': '$surname'
            },
            'lastname': {
                '$first': '$lastname'
            },
            'qualification': {
                '$first': '$qualification'
            },
            'languages': {
                '$first': '$languages'
            },
            'job_experiences': {
                '$first': '$job_experiences'
            },
            'enrolls': {
                '$push': '$enrolls'
            },
            'jobOpenings': {
                '$push': '$jobOpenings'
            }
        }
    }
];
