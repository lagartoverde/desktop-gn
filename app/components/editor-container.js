import { action } from '@ember/object';
import {
  em,
  strikethrough,
  strong,
  underline,
} from '@lblod/ember-rdfa-editor/marks';
import {
    blockRdfaWithConfig,
    docWithConfig,
    hard_break,
    horizontal_rule,
    invisibleRdfaWithConfig,
    paragraph,
    repairedBlockWithConfig,
    text,
  } from '@lblod/ember-rdfa-editor/nodes';
import {
    tableNodes,
    tablePlugins,
    tableKeymap,
} from '@lblod/ember-rdfa-editor/plugins/table';
import {
    bulletListWithConfig,
    listItemWithConfig,
    listTrackingPlugin,
    orderedListWithConfig,
} from '@lblod/ember-rdfa-editor/plugins/list';
import { placeholder } from '@lblod/ember-rdfa-editor/plugins/placeholder';
import { headingWithConfig } from '@lblod/ember-rdfa-editor/plugins/heading';
import { blockquote } from '@lblod/ember-rdfa-editor/plugins/blockquote';
import { code_block } from '@lblod/ember-rdfa-editor/plugins/code';
import { image } from '@lblod/ember-rdfa-editor/plugins/image';
import {
  date,
  dateView,
} from '@lblod/ember-rdfa-editor-lblod-plugins/plugins/variable-plugin/variables';
import { Schema } from 'prosemirror-model';
import Component from '@glimmer/component';

export default class EditorComponent extends Component {
  get schema(){
    // A prosemirror schema which determines how documents are parsed and written to the DOM.
    return new Schema({
      nodes: {
        doc: docWithConfig({ rdfaAware: true }),
      paragraph,
      repaired_block: repairedBlockWithConfig({ rdfaAware: true }),
      list_item: listItemWithConfig({ enableHierarchicalList: true }),
      ordered_list: orderedListWithConfig({ enableHierarchicalList: true }),
      bullet_list: bulletListWithConfig({ enableHierarchicalList: true }),
      placeholder,
      ...tableNodes({ tableGroup: 'block', cellContent: 'block+' }),
      date: date(this.config.date),
      heading: headingWithConfig({ rdfaAware: true }),
      blockquote,
      horizontal_rule,
      code_block,
      text,
      image,
      hard_break,
      invisible_rdfa: invisibleRdfaWithConfig({ rdfaAware: true }),
      block_rdfa: blockRdfaWithConfig({ rdfaAware: true }),
      inline_rdfa: inlineRdfaWithConfig({ rdfaAware: true }),
      link: link(this.config.link),
      },
      marks: {
        em,
        strong,
        underline,
        strikethrough,
        subscript,
        superscript,
        highlight,
        color,
      }
    })
  }

  get config() {
    return {
      link: {
        interactive: true,
        rdfaAware: true,
      },
      date: {
        placeholder: {
          insertDate: 'Insert Date',
          insertDateTime: 'Insert Datetime',
        },
        formats: [
          {
            label: 'Short Date',
            key: 'short',
            dateFormat: 'dd/MM/yy',
            dateTimeFormat: 'dd/MM/yy HH:mm',
          },
          {
            label:'Long Date',
            key: 'long',
            dateFormat: 'EEEE dd MMMM yyyy',
            dateTimeFormat: 'PPPPp',
          },
        ],
        allowCustomFormat: true,
      },
    };
  }

  get plugins(){
    // A list of prosemirror plugins you want to enable. More information about prosemirror plugins can be found on https://prosemirror.net/docs/guide/#state.plugins.
    return [...tablePlugins, tableKeymap];
  }

  @action
  editorInit(controller){
    // This method may contain code that runs when the editor has just loaded. It can be useful to e.g. load a document into the editor.
  }
}