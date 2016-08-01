'use strict';

module.exports = {
  disallowAttributeConcatenation: true,
  disallowClassAttributeWithStaticValue: true,
  disallowClassLiteralsBeforeAttributes: true,
  disallowClassLiteralsBeforeIdLiterals: true,
  disallowIdAttributeWithStaticValue: true,
  disallowIdLiteralsBeforeAttributes: true,
  disallowLegacyMixinCall: true,
  disallowDuplicateAttributes: true,
  disallowSpacesInsideAttributeBrackets: true,
  disallowStringConcatenation: true,
  requireLineFeedAtFileEnd: true,
  requireLowerCaseAttributes: true,
  requireLowerCaseTags: true,
  requireSpaceAfterCodeOperator: true,
  requireStrictEqualityOperators: true,
  validateAttributeQuoteMarks: '"',
  validateAttributeSeparator: {
    separator: ', ',
    multiLineSeparator: ',\n  '
  },
  validateDivTags: true,
  validateIndentation: 2,
  validateLineBreaks: 'LF',
  validateTemplateString: true
};
