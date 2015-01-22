#!/usr/bin/env node

var path        = require('path');
var fs          = require('fs');
var tfm         = require('tiny-frontmatter');
var jade        = require('jade');
var slug        = require('slug');
var wkhtmltopdf = require('wkhtmltopdf');
var xml2js      = require('xml2js');
var merge       = require('merge');
var moment      = require('moment');
var parser      = new xml2js.Parser();
var file        = path.resolve(process.argv[2]);

if ( ! fs.existsSync(file)) {
    console.error('Invalid input file.');
    process.exit(1);
}

function toc2Index(file) {
    var pages  = [];

    if (fs.existsSync(file)) {
        var data = fs.readFileSync(file, 'ascii');

        function findItemsRecursively(holder, node) {
            if ( ! node.item) return;
            node.item.forEach(function (item) {
                if (item['$'].title) {
                    var page = {
                        title: item['$'].title,
                        page: parseInt(item['$'].page, 10),
                        subpages: []
                    };
                    holder.push(page);
                    findItemsRecursively(page.subpages, item);
                    if ( ! page.subpages.length) {
                        delete page.subpages;
                    }
                } else {
                    findItemsRecursively(holder, item);
                }
            });
        }

        parser.parseString(data, function (err, result) {
            if (err) return;
            findItemsRecursively(pages, result.outline);
        });
    }

    return pages;
}

fs.readFile(file, 'utf-8', function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    // Parse document configuraton plus data
    var parsed = tfm(data);
    var title  = parsed.attributes.title || 'Untitled Document';
    
    // Prepare
    var name         = slug(title).toLowerCase();
    var documentHTML = '';
    var options      = {};
    var config       = parsed.attributes;
    var generateDir  = path.dirname(process.argv[1]);
    var includesDir  = path.join(generateDir, 'includes');
    var compiledDir  = path.join(generateDir, '.compiled');
    var documentDir  = path.resolve(path.dirname(file));

    moment.locale('nl_NL');

    // Create .compiled/ directory
    try {
        fs.mkdirSync(compiledDir);
    } catch (e) {}

    // Default options
    options.encoding = 'UTF-8';
    options.pageSize = 'A4';

    config.basepath = path.dirname(file);

    // Styling
    options.userStyleSheet = path.resolve(path.join(generateDir, 'assets', 'style.css'));
    options.marginTop      = '30mm';
    options.marginBottom   = '28mm';
    options.marginLeft     = '12mm';
    options.marginRight    = '12mm';

    // Header
    var headerFile = path.join(compiledDir, 'header.html');
    
    fs.writeFileSync(headerFile, jade.renderFile(
        path.join(includesDir, 'header.jade'),
        { config: config }
    ));

    options.headerHtml = 'file://' + headerFile;

    // Footer
    var footerFile = path.join(compiledDir, 'footer.html');
    
    fs.writeFileSync(footerFile, jade.renderFile(
        path.join(includesDir, 'footer.jade'),
        { config: config }
    ));

    options.footerHtml = 'file://' + footerFile;

    // Compile cover
    var coverFile = path.join(compiledDir, 'cover.html');

    fs.writeFileSync(coverFile, jade.renderFile(
        path.join(includesDir, 'cover.jade'),
        { config: config, moment: moment }
    ));

    options.cover = coverFile;
 
    // Compile index, document, etc.
    var documentFile = path.join(compiledDir, 'document.html');
    var tocFile      = path.join(compiledDir, name + '.toc.xml');
    var html         = jade.render(
        parsed.body,
        {
            filename: file,
            basedir: path.dirname(file),
            config: config 
        }
    );

    options.dumpOutline = tocFile;

    // TODO(mauvm): Concatinate multiple HTML files here with wkhtmltopdf. Not supported yet.
    var files = [
        { key: 'prepend', file: path.join(includesDir, 'prepend.jade') },
        { key: 'index', file: path.join(includesDir, 'index.jade'), config: { index: toc2Index(tocFile) } },
        { key: 'document', html: html },
        { key: 'append', file: path.join(includesDir, 'append.jade') }
    ];

    // Check for chapters to prepend
    if (Array.isArray(parsed.attributes.prepend)) {
        parsed.attributes.prepend.forEach(function (prependFile, index) {
            files.splice(1 + index, 0, {
                key: prependFile,
                file: path.resolve(path.join(documentDir, prependFile))
            });
        });
    }

    // Render files
    files.forEach(function (item, index) {
        documentHTML += '\n<!-- FILE: ' + item.key + ' -->\n';

        if (typeof item.html === 'string') {
            documentHTML += item.html;
            return;
        }

        documentHTML += jade.renderFile(item.file, merge({
            filename: item.file,
            basedir: path.dirname(item.file),
            config: config,
            moment: moment
        }, (item.config || {})));
    });

    fs.writeFileSync(documentFile, documentHTML);

    // Generate PDF
    var filename = 'Document.pdf'; // title + '.pdf'
    options.output = path.join(documentDir, filename); 
    // console.log(config, options);

    wkhtmltopdf('file://' + documentFile, options, function (code, signal) {
        if (code || signal) {
            console.error('Code: %s, signal: %s', code, signal);
            process.exit(1);
        }
    });
});

