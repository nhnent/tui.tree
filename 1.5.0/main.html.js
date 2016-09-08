tui.util.defineNamespace("fedoc.content", {});
fedoc.content["main.html"] = "<div id=\"main\" class=\"readme\">\n\n\n\n    \n\n\n    <h3> </h3>\n\n\n\n\n\n\n\n\n\n\n    \n\n\n\n\n    <section class=\"main-content\">\n        <article><div class=\"readme\"><h1>Tree</h1><p>Tree component<br><br>Display the hierarchical data by tree.<br><br>Each node can be moved by drag and drop.</p>\n<h2>Feature</h2><ul>\n<li>Display hierarchical data by tree UI</li>\n<li>Fold sub tree</li>\n<li>Create &amp; Edit node</li>\n<li>Drag and drop (extend)</li>\n<li>Tri-state checkbox</li>\n<li>Custom events</li>\n<li>Context menu</li>\n<li>Ajax</li>\n</ul>\n<h2>Documentation</h2><ul>\n<li><strong>API</strong> : https://nhnent.github.io/tui.component.tree/latest</li>\n<li><strong>Tutorial</strong> : https://github.com/nhnent/tui.component.tree/wiki/Tree-Tutorial</li>\n<li><strong>Sample</strong> - https://nhnent.github.io/tui.component.tree/latest/tutorial.html</li>\n</ul>\n<h2>Sample Image</h2><ul>\n<li>Default<br><br><img src=\"https://nhnent.github.io/tui.component.tree/tree.png\" alt=\"alt tag\"><br></li>\n<li>Label Apply<br><br><img src=\"https://nhnent.github.io/tui.component.tree/tree_edit.png\" alt=\"alt tag\"><br></li>\n<li>Daraggable<br><br><img src=\"https://cloud.githubusercontent.com/assets/18183560/15561914/85815950-2335-11e6-908e-ee6035b17f73.png\" alt=\"alt tag\"><br></li>\n<li>Context Menu<br><br><img src=\"https://cloud.githubusercontent.com/assets/18183560/15561915/8582a616-2335-11e6-9e25-8b521e11292b.png\" alt=\"alt tag\"><br></li>\n</ul>\n<h2>Dependency</h2><ul>\n<li>tui-code-snippet: ~1.2.0</li>\n<li>tui-contextmenu: ~1.1.1 (for using ContextMenu feature)</li>\n<li>jquery : ~1.8.3 (for using Ajax feature)</li>\n</ul>\n<h2>Test environment</h2><ul>\n<li>PC<ul>\n<li>IE7~11</li>\n<li>Edge</li>\n<li>Chrome</li>\n<li>Firefox</li>\n<li>PhantomJS</li>\n</ul>\n</li>\n</ul>\n<h2>Download/Install</h2><ul>\n<li>Bower:<ul>\n<li>latest : <code>bower install tui-component-tree</code></li>\n<li>each version : <code>bower install tui-component-tree[#tag]</code></li>\n</ul>\n</li>\n<li>Download: https://github.com/nhnent/tui.component.tree</li>\n</ul>\n<h2>LICENSE</h2><p><a href=\"LICENSE\">MIT LICENSE</a></p>\n<h2>Sponsor</h2><ul>\n<li><img src=\"https://cloud.githubusercontent.com/assets/12269563/12287774/8cf4d2c0-ba12-11e5-9fa8-0a9c452cca05.png\" height=\"30\"><br><br><a href=\"https://www.browserstack.com/\">BrowserStack</a> is a cloud based cross browser testing tool</li>\n</ul></div></article>\n    </section>\n\n\n\n\n\n\n\n\n\n<section>\n\n<header>\n    \n        <h2>\n        \n        tree.js\n        \n        \n        </h2>\n        \n    \n</header>\n\n<article>\n    \n    <div class=\"container-overview\">\n    \n        \n            <div class=\"description\"><p>Render tree and update tree.</p></div>\n        \n\n        \n\n\n<dl class=\"details main-detail\">\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n    <dt class=\"tag-author\">Author:</dt>\n    <dd class=\"tag-author\">\n        <ul>\n            <li>NHN Ent. FE dev team.&lt;dl_javascript@nhnent.com></li>\n        </ul>\n    </dd>\n    \n\n    \n\n    \n\n    \n\n    \n    <dt class=\"tag-source\">Source:</dt>\n        <dd class=\"tag-source\"><ul class=\"dummy\"><li>\n            file, line 1\n        </li></ul></dd>\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n        \n    \n    </div>\n    \n\n    \n\n    \n\n    \n\n     \n\n    \n\n    \n\n    \n\n    \n\n    \n</article>\n\n</section>\n\n\n\n\n\n\n\n<section>\n\n<header>\n    \n        <h2>\n        \n        treeModel.js\n        \n        \n        </h2>\n        \n    \n</header>\n\n<article>\n    \n    <div class=\"container-overview\">\n    \n        \n            <div class=\"description\"><p>Update view and control tree data</p></div>\n        \n\n        \n\n\n<dl class=\"details main-detail\">\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n    <dt class=\"tag-author\">Author:</dt>\n    <dd class=\"tag-author\">\n        <ul>\n            <li>NHN Ent. FE dev team.&lt;dl_javascript@nhnent.com></li>\n        </ul>\n    </dd>\n    \n\n    \n\n    \n\n    \n\n    \n    <dt class=\"tag-source\">Source:</dt>\n        <dd class=\"tag-source\"><ul class=\"dummy\"><li>\n            file, line 1\n        </li></ul></dd>\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n        \n    \n    </div>\n    \n\n    \n\n    \n\n    \n\n     \n\n    \n\n    \n\n    \n\n    \n\n    \n</article>\n\n</section>\n\n\n\n\n\n\n\n<section>\n\n<header>\n    \n        <h2>\n        \n        util.js\n        \n        \n        </h2>\n        \n    \n</header>\n\n<article>\n    \n    <div class=\"container-overview\">\n    \n        \n            <div class=\"description\"><p>Helper object to make easy tree elements</p></div>\n        \n\n        \n\n\n<dl class=\"details main-detail\">\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n    <dt class=\"tag-author\">Author:</dt>\n    <dd class=\"tag-author\">\n        <ul>\n            <li>NHN Ent. FE dev team.&lt;dl_javascript@nhnent.com></li>\n        </ul>\n    </dd>\n    \n\n    \n\n    \n\n    \n\n    \n    <dt class=\"tag-source\">Source:</dt>\n        <dd class=\"tag-source\"><ul class=\"dummy\"><li>\n            file, line 1\n        </li></ul></dd>\n    \n\n    \n\n    \n\n    \n</dl>\n\n\n\n        \n    \n    </div>\n    \n\n    \n\n    \n\n    \n\n     \n\n    \n\n    \n\n    \n\n    \n\n    \n</article>\n\n</section>\n\n\n\n</div>"