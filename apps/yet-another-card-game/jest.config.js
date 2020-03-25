module.exports = {
  name: 'yet-another-card-game',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/yet-another-card-game',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
