[{$match: {
        _id: '0223067b-9630-4b87-9105-5b50b73ba612'
    }}, {$lookup: {
        from: 'jobOpenings',
        localField: '_id',
        foreignField: 'company',
        as: 'jobOpenings'
    }}, {$unwind: {
        path: '$jobOpenings',
        preserveNullAndEmptyArrays: true
    }}, {$lookup: {
        from: 'enrollments',
        localField: 'jobOpenings._id',
        foreignField: 'job_opening',
        as: 'enrolls'
    }}, {$unwind: {
        path: '$enrolls',
        preserveNullAndEmptyArrays: true
    }}, {$lookup: {
        from: 'students',
        localField: 'enrolls.student',
        foreignField: '_id',
        as: 'enrolls.studentDetail'
    }}, {$unwind: {
        path: '$enrolls.studentDetail',
        preserveNullAndEmptyArrays: true
    }}, {$group: {
        _id: {
            _id: '$_id',
            address: '$address',
            city: '$city',
            description: '$description',
            name: '$name',
            postalCode: '$postalCode',
            region: '$region',
            jobOpenings: {
                _id: '$jobOpenings._id',
                conditions: '$jobOpenings.conditions',
                createdAt: '$jobOpenings.createdAt',
                position: '$jobOpenings.position',
                prevExperience: '$jobOpenings.prevExperience',
                title: '$jobOpenings.title',
                hiringDate: '$jobOpenings.hiringDate'
            }
        },
        enrolls: { $push: '$enrolls' }
    }}, {$group: {
        _id: '$_id._id',
        address: {
            $first: '$_id.address'
        },
        city: {
            $first: '$_id.city'
        },
        description: {
            $first: '$_id.description'
        },
        name: {
            $first: '$_id.name'
        },
        postalCode: {
            $first: '$_id.postalCode'
        },
        region: {
            $first: '$_id.region'
        },
        jobOpenings: {
            $push: {
                _id: '$_id.jobOpenings._id',
                conditions: '$_id.jobOpenings.conditions',
                createdAt: '$_id.jobOpenings.createdAt',
                position: '$_id.jobOpenings.position',
                prevExperience: '$_id.jobOpenings.prevExperience',
                title: '$_id.jobOpenings.title',
                hiringDate: '$_id.jobOpenings.hiringDate',
                enrolls: '$enrolls'
            }

        }
    }}]


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
            'as': 'enrolls.studentDetail'
        }
    }, {
        '$unwind': {
            'path': '$enrolls.studentDetail',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$group': {
            '_id': {
                '_id': '$_id',
                'address': '$address',
                'city': '$city',
                'description': '$description',
                'name': '$name',
                'postalCode': '$postalCode',
                'region': '$region',
                'jobOpenings': {
                    '_id': '$jobOpenings._id',
                    'conditions': '$jobOpenings.conditions',
                    'createdAt': '$jobOpenings.createdAt',
                    'position': '$jobOpenings.position',
                    'prevExperience': '$jobOpenings.prevExperience',
                    'title': '$jobOpenings.title',
                    'hiringDate': '$jobOpenings.hiringDate'
                }
            },
            'enrolls': {
                '$push': '$enrolls'
            }
        }
    }, {
        '$group': {
            '_id': '$_id._id',
            'address': {
                '$first': '$_id.address'
            },
            'city': {
                '$first': '$_id.city'
            },
            'description': {
                '$first': '$_id.description'
            },
            'name': {
                '$first': '$_id.name'
            },
            'postalCode': {
                '$first': '$_id.postalCode'
            },
            'region': {
                '$first': '$_id.region'
            },
            'jobOpenings': {
                '$push': {
                    '_id': '$_id.jobOpenings._id',
                    'conditions': '$_id.jobOpenings.conditions',
                    'createdAt': '$_id.jobOpenings.createdAt',
                    'position': '$_id.jobOpenings.position',
                    'prevExperience': '$_id.jobOpenings.prevExperience',
                    'title': '$_id.jobOpenings.title',
                    'hiringDate': '$_id.jobOpenings.hiringDate',
                    'enrolls': '$enrolls'
                }
            }
        }
    }
];
