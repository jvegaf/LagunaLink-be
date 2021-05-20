[{
    $match: {
        _id: '0223067b-9630-4b87-9105-5b50b73ba612'
    }
}, {
    $lookup: {
        from: 'jobOpenings',
        localField: '_id',
        foreignField: 'company',
        as: 'jobOpenings'
    }
}, {
    $unwind: {
        path: '$jobOpenings',
        preserveNullAndEmptyArrays: true
    }
}, {
    $lookup: {
        from: 'enrollments',
        localField: 'jobOpenings._id',
        foreignField: 'job_opening',
        as: 'enrolls'
    }
}, {
    $unwind: {
        path: '$enrolls',
        preserveNullAndEmptyArrays: true
    }
}, {
    $lookup: {
        from: 'students',
        localField: 'enrolls.student',
        foreignField: '_id',
        as: 'studentDetail'
    }
}, {
    $unwind: {
        path: '$studentDetail',
        preserveNullAndEmptyArrays: true
    }
}, {
    $group: {
        _id: '$_id',
        address: {
            $first: '$address'
        },
        city: {
            $first: '$city'
        },
        description: {
            $first: '$description'
        },
        name: {
            $first: '$name'
        },
        postalCode: {
            $first: '$postalCode'
        },
        region: {
            $first: '$region'
        },
        jobOpenings: {
            $push: '$jobOpenings'
        },
        enrolls: {
            $push: '$enrolls'
        },
        students: {
            $push: '$studentDetail'
        }
    }
}]

const agg = [
    {
        '$match': {
            '_id': '0223067b-9630-4b87-9105-5b50b73ba612'
        }
    }, {
        '$lookup': {
            'from': 'jobOpenings',
            'localField': '_id',
            'foreignField': 'company',
            'as': 'jobOpenings'
        }
    }, {
        '$unwind': {
            'path': '$jobOpenings',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$lookup': {
            'from': 'enrollments',
            'localField': 'jobOpenings._id',
            'foreignField': 'job_opening',
            'as': 'enrolls'
        }
    }, {
        '$unwind': {
            'path': '$enrolls',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$lookup': {
            'from': 'students',
            'localField': 'enrolls.student',
            'foreignField': '_id',
            'as': 'studentDetail'
        }
    }, {
        '$unwind': {
            'path': '$studentDetail',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$group': {
            '_id': '$_id',
            'address': {
                '$first': '$address'
            },
            'city': {
                '$first': '$city'
            },
            'description': {
                '$first': '$description'
            },
            'name': {
                '$first': '$name'
            },
            'postalCode': {
                '$first': '$postalCode'
            },
            'region': {
                '$first': '$region'
            },
            'jobOpenings': {
                '$push': '$jobOpenings'
            },
            'enrolls': {
                '$push': '$enrolls'
            },
            'students': {
                '$push': '$studentDetail'
            }
        }
    }
];
