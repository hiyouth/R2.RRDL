/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    config.uiColor = '#9ECAD0';
    config.height = 400;
    config.extraPlugins = 'syntaxhighlight';
    config.skin = 'kama';
    config.language = 'zh-cn';
    config.removePlugins = "elementspath";
    config.toolbar_Full =
[
['Source', '-', 'Save', 'NewPage', 'Preview', '-', 'Templates'],
['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print', 'SpellChecker', 'Scayt'],
['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'],
['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
'/',
['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
['Link', 'Unlink', 'Anchor'],
['addpic', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'],
'/',
['Styles', 'Format', 'Font', 'FontSize'],
['TextColor', 'BGColor'],
['Maximize', 'ShowBlocks', '-', 'About']
];
    config.toolbar_Full.push(['Code']);
    config.toolbar_Basic =
[
['Source', '-', 'Save', 'NewPage', '-', ],
['Cut', 'Copy', 'Paste', 'PasteText', '-',],
['Undo', 'Redo', '-', 'SelectAll', 'RemoveFormat'],
['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
['HorizontalRule', 'PageBreak'],
['addpic'],
'/',
['Styles', 'Format', 'Font', 'FontSize'],
['Maximize',]
];
    config.extraPlugins = 'addpic';

    //config.toolbar_Basic.push(['addpic']);
    config.forcePasteAsPlainText = true;
    config.pasteFromWordKeepsStructure = true;
    config.pasteFromWordRemoveStyle = true;
    config.pasteFromWordRemoveFontStyles = true;
};

